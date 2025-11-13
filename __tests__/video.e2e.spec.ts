import request from 'supertest';
import express from 'express';
import {setupApp} from "../src/setup-app";
import {VideoInput} from "../src/videos/dto/video.input";
import {HttpStatus} from "../src/core/types/http-statuses";

describe('Video API', () => {
    const app = express();
    setupApp(app);

    const testVideoData: VideoInput = {

        "title": "First video",
        "author": "Valya",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2025-11-12T20:17:13.796Z",
        "publicationDate": "2025-11-12T20:17:13.796Z",
        "availableResolutions": ['P144']
    }
    beforeAll(async () => {
        await request(app).delete("/testing/all-data").expect(HttpStatus.NoContent);
    });

    it('should create a new video; POST videos', async () => {
        const newVideo: VideoInput = {
            "title": "string",
            "author": "string",
            "availableResolutions": [
                "P144"
            ]
        };
        await request(app)
            .post('/videos')
            .send(newVideo)
            .expect(HttpStatus.Created);
    });
    it('should return videos list; GET /videos', async () => {
        await request(app)
            .post('/videos')
            .send({...testVideoData, title: 'another string', author: 'another string' })
            .expect(HttpStatus.Created);
        await request(app)
            .post('/videos')
            .send({...testVideoData, title: 'another string2', author: 'another string2' })
            .expect(HttpStatus.Created);
        const videoListResponse = await request(app)
            .get('/videos')
            .expect(HttpStatus.Ok);
        expect(videoListResponse.body).toBeInstanceOf(Array);
        expect(videoListResponse.body.length).toBe(3);
    });
    it('should return videos list; GET /videos', async () => {

    });

})