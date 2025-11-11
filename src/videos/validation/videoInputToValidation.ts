import {ValidationError} from "../types/validationsErrors";
import {VideoInput} from "../dto/video.input";
import {VideoCreateInput} from "../dto/video-create.input";
import {Resolutions} from "../types/video";

export const videoInputToValidation = (
    data: VideoInput
): ValidationError[] =>{
    const errors: ValidationError[] = [];
    console.log('validation data:', data);
    const {
        title,
        author,
        canBeDownloaded,
        minAgeRestriction,
        createdAt,
        publicationDate,
        availableResolutions,
    } = data.attributes;
    if(!title || typeof title !=='string'|| title.trim().length<2||title.trim().length>40){
        errors.push({field: 'title', message: 'Invalid title'});
    }
    if(!author || typeof author !=='string'||  author.trim().length<2||author.trim().length>20){
        errors.push({field: 'author', message: 'Invalid author'});
    }
    if(canBeDownloaded === undefined || typeof canBeDownloaded !=='boolean'){
        errors.push({field: 'canBeDownloaded', message: 'Invalid canBeDownloaded'});
    }
    if(!author || typeof author !=='string'||  author.trim().length<2||author.trim().length>15){
        errors.push({field: 'author', message: 'Invalid author'});
    }
}

