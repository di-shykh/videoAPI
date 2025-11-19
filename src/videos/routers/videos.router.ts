import {Request, Response, Router} from "express";
import {VideoInput} from "../dto/video.input";
import {videoInputToValidation} from "../validation/videoInputToValidation";
import {HttpStatus} from "../../core/types/http-statuses";
import {createErrorMessages} from "../../core/utils/error.utils";
import {Resolutions, Video} from "../types/video";
import {db} from "../../db/in-memory.db";
import {ValidationError} from "../types/validationsErrors";

export const videoRouter = Router({});

videoRouter
    .get('', (req: Request, res: Response) :void => {
        res.status(HttpStatus.Ok).send(db.videos);
    })
    .get('/:id', (req: Request, res: Response) :void => {
        const idParams = req.params.id;
        if(!idParams) {
            res.status(HttpStatus.BadRequest).send(
                createErrorMessages([{field: 'id', message: 'Invalid ID.'}])
            );
            return;
        }
        const id :number = parseInt(idParams);
        if(id <= 0 || isNaN(id)) {
            res.status(HttpStatus.BadRequest).send(
                createErrorMessages([{field: 'id', message: 'Invalid ID.'}])
            );
            return;
        }
        const video: Video|undefined = db.videos.find((v: Video) :boolean =>v.id === id);
        if(!video) {
            res.status(HttpStatus.NotFound).send(
                createErrorMessages([{field: 'id', message: 'Video not found'}])
            )
            return;
        }
        res.status(HttpStatus.Ok).send(video);
    })
    .post('', (req: Request<{},{},VideoInput>, res: Response) :void => {
        const errors: ValidationError[] = videoInputToValidation(req.body);
        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }
        const newVideo: Video = {
            id: db.videos.length > 0 ? (db.videos[db.videos.length - 1]?.id ?? 0) + 1 : 1,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: req.body.canBeDownloaded ?? false,
            minAgeRestriction: req.body.minAgeRestriction ?? null,
            createdAt: req.body.createdAt ?? new Date().toISOString(),
            publicationDate: req.body.publicationDate ?? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            availableResolutions: req.body.availableResolutions,
        }
        db.videos.push(newVideo);
        res.status(HttpStatus.Created).send(newVideo);
    })
    .put('/:id', (req: Request, res: Response) :void => {
        const idParams = req.params.id;
        if(!idParams) {
            res.status(HttpStatus.BadRequest).send(
                createErrorMessages([{field: 'id', message: 'Invalid ID.'}])
            );
            return;
        }
        const id :number = parseInt(idParams);
        if(id <= 0 || isNaN(id)) {
            res.status(HttpStatus.BadRequest).send(
                createErrorMessages([{field: 'id', message: 'Invalid ID.'}])
            );
            return;
        }
        const index: number = db.videos.findIndex((v :Video)=> v.id === id );
        if(index === -1) {
            res.status(HttpStatus.NotFound).send(createErrorMessages([{field: 'id', message: 'Video not found'}]))
            return;
        }
        const errors: ValidationError[] = videoInputToValidation(req.body);
        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }
        const videoForUpdate: Video|undefined = db.videos[index];
        if (videoForUpdate) {
            videoForUpdate.title = req.body.title;
            videoForUpdate.author = req.body.author;
            videoForUpdate.minAgeRestriction = req.body.minAgeRestriction;
            videoForUpdate.availableResolutions = req.body.availableResolutions;
            videoForUpdate.canBeDownloaded = req.body.canBeDownloaded;
            videoForUpdate.publicationDate = req.body.publicationDate;

            res.sendStatus(HttpStatus.NoContent);
        }
    })
    .delete('/:id', (req: Request, res: Response) :void => {
        const idParams = req.params.id;
        if(!idParams) {
            res.status(HttpStatus.BadRequest).send(
                createErrorMessages([{field: 'id', message: 'Invalid ID.'}])
            );
            return;
        }
        const id :number = parseInt(idParams);
        if(id <= 0 || isNaN(id)) {
            res.status(HttpStatus.BadRequest).send(
                createErrorMessages([{field: 'id', message: 'Invalid ID.'}])
            );
            return;
        }
        const index: number = db.videos.findIndex((v :Video)=> v.id === id );
        if(index === -1) {
            res.status(HttpStatus.NotFound).send(createErrorMessages([{field: 'id', message: 'Video not found'}]))
            return;
        }
        db.videos.splice(index, 1);
        res.sendStatus(HttpStatus.NoContent);
    })
