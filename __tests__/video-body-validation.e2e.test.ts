import request from 'supertest';
import express from 'express';
import { setupApp } from '../src/setup-app';
import { VideoInput } from '../src/videos/dto/video.input';
import { HttpStatus } from '../src/core/types/http-statuses';
import { Resolutions } from '../src/videos/types/video';

describe('Video API', () => {
  const app = express();
  setupApp(app);
  const BASE_URL = '/hometask_01/api';

  const correctVideoData: VideoInput = {
    title: 'First video',
    author: 'Valya',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: '2025-11-12T20:17:13.796Z',
    publicationDate: '2025-11-12T20:17:13.796Z',
    availableResolutions: [Resolutions.P144],
  };
  beforeEach(async () => {
    await request(app)
      .delete(`${BASE_URL}/testing/all-data`)
      .expect(HttpStatus.NoContent);
  });
  it('should not create video when incorrect body passed; POST /videos', async () => {
    const invalidDataSet1 = await request(app)
      .post(`${BASE_URL}/videos`)
      .send({
        ...correctVideoData,
        title: '    ',
        author: '    ',
        availableResolutions: [],
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorMessages).toHaveLength(3);

    const invalidDataSet2 = await request(app)
      .post(`${BASE_URL}/videos`)
      .send({
        ...correctVideoData,
        title: '',
        author: '',
        availableResolutions: '',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorMessages).toHaveLength(3);
    const videoListResponse = await request(app).get(`${BASE_URL}/videos`);
    expect(videoListResponse.body).toHaveLength(0);
  });
  it('should not update video when incorrect body passed; PUT /videos/:id', async () => {
    const {
      body: { id: createdVideoId },
    } = await request(app)
      .post(`${BASE_URL}/videos`)
      .send({ ...correctVideoData })
      .expect(HttpStatus.Created);
    const invalidDataSet1 = await request(app)
      .put(`${BASE_URL}/videos/${createdVideoId}`)
      .send({
        ...correctVideoData,
        title: '    ',
        author: '    ',
        availableResolutions: [],
        createdAt: 'kgsjgslTdfgkjs',
        publicationDate: 'sdfsjfsTsdfjsj',
        canBeDownloaded: '',
        minAgeRestriction: 20,
      })
      .expect(HttpStatus.BadRequest);
    expect(invalidDataSet1.body.errorMessages).toHaveLength(7);
    const invalidDataSet2 = await request(app)
      .put(`${BASE_URL}/videos/${createdVideoId}`)
      .send({
        ...correctVideoData,
        title: '1',
        author: '2',
        availableResolutions: [],
        createdAt: '2023-12-11',
        publicationDate: '2025-11-12T20',
        canBeDownloaded: 3,
        minAgeRestriction: -1,
      })
      .expect(HttpStatus.BadRequest);
    expect(invalidDataSet2.body.errorMessages).toHaveLength(7);
  });
});
