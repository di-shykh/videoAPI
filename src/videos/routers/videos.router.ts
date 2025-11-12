import {Request, Response, Router} from "express";
import {VideoInput} from "../dto/video.input";
import {videoInputToValidation} from "../validation/videoInputToValidation";
import {HttpStatus} from "../../core/types/http-statuses";
import {createErrorMessages} from "../../core/utils/error.utils";
import {Video} from "../types/video";
import {db} from "../../db/in-memory.db";

export const videoRouter = Router({});

videoRouter
    .get('', (req: Request, res: Response) :void => {
        res.status(HttpStatus.Ok).send(db.videos);
    })
    .get('/:id', (req: Request, res: Response) :void => {
        const id :number = parseInt(req.params.id);
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
    .post('', (req: Request, res: Response) :void => {

    })