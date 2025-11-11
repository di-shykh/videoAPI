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
    if(!title || typeof title !=='string'||  title.trim().length<2||author.trim().length>40){
        errors.push({field: 'title', message: 'Invalid title'});
    }
    if(!author || typeof author !=='string'||  author.trim().length<2||author.trim().length>20){
        errors.push({field: 'author', message: 'Invalid author'});
    }
    if(canBeDownloaded === undefined || typeof canBeDownloaded !=='boolean'){
        errors.push({field: 'canBeDownloaded', message: 'Invalid canBeDownloaded'});
    }
    if (minAgeRestriction) {
        if(!Number.isInteger(minAgeRestriction) || minAgeRestriction<1||minAgeRestriction>18){
            errors.push({field: 'minAgeRestriction', message: 'Invalid minAgeRestriction. It must be an integer between 1 and 18.'});
        }
    }
    if(!createdAt || typeof createdAt!=='string'|| !createdAt.includes('T')){
        errors.push({field: 'createdAt', message: 'Invalid createdAt.'});
    }
    if(!publicationDate|| typeof publicationDate!=='string'|| !publicationDate.includes('T')){
        errors.push({field: 'publicationDate', message: 'Invalid publicationDate'});
    }
    if (!availableResolutions || availableResolutions.length<1 || availableResolutions.length>8 || !areAllResolutionsValid(availableResolutions)){
        errors.push({field: 'availableResolutions', message: 'Invalid available resolutions'});
    }
}
function areAllResolutionsValid(resolutions: string[]):boolean{
    const validValues: string[] = Object.values(Resolutions);
    return resolutions.every(res => validValues.includes(res));
}

