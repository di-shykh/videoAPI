import express, {Express, Request, Response} from 'express';
import {videoRouter} from './videos/routers/videos.router';
import {HttpStatus} from './core/types/http-statuses';

export const setupApp = (app: Express): Express=> {
    app.use(express.json());

    app.get('/', (request: Request, res: Response) => {
        res.status (HttpStatus.Ok).send('Server started');
    });

    app.use('hometask_01/api/videos', videoRouter);

    return app;
}