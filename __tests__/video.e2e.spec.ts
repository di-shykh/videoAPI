import request from 'supertest';
import express from 'express';
import {setupApp} from '../src/setup-app';
import {VideoInput} from '../src/videos/dto/video.input';
import {HttpStatus} from '../src/core/types/http-statuses';
import {Resolutions} from '../src/videos/types/video';

describe('Video API', () => {
    const app = express();
    setupApp(app);
    const BASE_URL = '/hometask_01/api';

    const testVideoData: VideoInput = {

        title: "First video",
        author: "Valya",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2025-11-12T20:17:13.796Z",
        publicationDate: "2025-11-12T20:17:13.796Z",
        availableResolutions: [Resolutions.P144]
    }
    beforeEach(async () => {
        await request(app).delete(`${BASE_URL}/testing/all-data`).expect(HttpStatus.NoContent);
    });
    // Тест для проверки, что приложение работает
    it('should respond to root', async () => {
        await request(app)
            .get(`${BASE_URL}/`)
            .expect(404); // или 200 если есть корневой маршрут
    });

    // Тест для проверки, что маршрут videos существует
    it('should respond to /videos', async () => {
        await request(app)
            .get(`${BASE_URL}/videos`)
            .expect(200); // или посмотреть реальный статус

    });
    it('should create a new video; POST videos', async () => {
        const newVideo: VideoInput = {
            title: "string",
            author: "string",
            availableResolutions: [
                Resolutions.P144
            ]
        };
       const responce = await request(app)
            .post(`${BASE_URL}/videos`)
            .send(newVideo)
            .expect(HttpStatus.Created);
       console.log('Created video', responce.body);
    });
    it('should return videos list; GET /videos', async () => {
        await request(app)
            .post(`${BASE_URL}/videos`)
            .send({...testVideoData, title: 'another string', author: 'another string' })
            .expect(HttpStatus.Created);
        await request(app)
            .post(`${BASE_URL}/videos`)
            .send({...testVideoData, title: 'another string2', author: 'another string2' })
            .expect(HttpStatus.Created);
        const videoListResponse = await request(app)
            .get(`${BASE_URL}/videos`)
            .expect(HttpStatus.Ok);
        expect(videoListResponse.body).toBeInstanceOf(Array);
        expect(videoListResponse.body.length).toBeGreaterThanOrEqual(2);
    });
    it('should return video by id; GET /videos/:id', async () => {
        const createResponse = await request(app)
        .post(`${BASE_URL}/videos`)
        .send({...testVideoData, title: 'another string', author: 'another string' })
        .expect(HttpStatus.Created);

        expect(createResponse.body).toEqual({
            ...createResponse.body,
            id: expect.any(Number),
            createdAt: expect.any(String),
        });
    })
    it('should update video by id; PUT /videos/:id', async () => {
        const createResponse = await request(app)
            .post(`${BASE_URL}/videos`)
            .send({...testVideoData, title: 'another string', author: 'another string' })
            .expect(HttpStatus.Created);

        const videoUpdateData: VideoInput = {
            title: "Updated video",
            author: "Updated Valya",
            canBeDownloaded: false,
            minAgeRestriction: 9,
            createdAt: "2025-10-12T20:17:13.796Z",
            publicationDate: "2025-10-12T20:17:13.796Z",
            availableResolutions: [Resolutions.P144,Resolutions.P240,Resolutions.P480]
        }
        await request(app)
            .put(`${BASE_URL}/videos/${createResponse.body.id}`)
            .send({...testVideoData, title: 'another string', author: 'another string' })
            .expect(HttpStatus.NoContent);
    })
    it('should delete video by id; DELETE /videos/:id', async () => {
        const {body: { id: createdVideoId}} = await request(app)
            .post(`${BASE_URL}/videos`)
            .send({...testVideoData, title: 'another string', author: 'another string' })
            .expect(HttpStatus.Created);
        await request(app)
            .delete(`${BASE_URL}/videos/${createdVideoId}`)
            .expect(HttpStatus.NoContent);
    })
})