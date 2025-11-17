"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoInputToValidation = void 0;
const video_1 = require("../types/video");
const videoInputToValidation = (data) => {
    const errors = [];
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 2 || data.author.trim().length > 40) {
        errors.push({ field: 'title', message: 'Invalid title' });
    }
    if (!data.author || typeof data.author !== 'string' || data.author.trim().length < 2 || data.author.trim().length > 20) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }
    if (data.canBeDownloaded !== undefined && typeof data.canBeDownloaded !== 'boolean') {
        errors.push({ field: 'canBeDownloaded', message: 'Invalid canBeDownloaded' });
    }
    if (data.minAgeRestriction) {
        if (!Number.isInteger(data.minAgeRestriction) || data.minAgeRestriction < 1 || data.minAgeRestriction > 18) {
            errors.push({ field: 'minAgeRestriction', message: 'Invalid minAgeRestriction. It must be an integer between 1 and 18.' });
        }
    }
    if (data.createdAt !== undefined && (!isDatetimeISOstring(data.createdAt) || !data.createdAt.includes('T'))) {
        errors.push({ field: 'createdAt', message: 'Invalid createdAt.' });
    }
    if (data.publicationDate !== undefined && (!isDatetimeISOstring(data.publicationDate) || !data.publicationDate.includes('T'))) {
        errors.push({ field: 'publicationDate', message: 'Invalid publicationDate' });
    }
    if (!data.availableResolutions || data.availableResolutions.length < 1 || data.availableResolutions.length > 8 || !areAllResolutionsValid(data.availableResolutions)) {
        errors.push({ field: 'availableResolutions', message: 'Invalid available resolutions' });
    }
    return errors;
};
exports.videoInputToValidation = videoInputToValidation;
function areAllResolutionsValid(resolutions) {
    const validValues = Object.values(video_1.Resolutions);
    return resolutions.every(res => validValues.includes(res));
}
function isDatetimeISOstring(str) {
    if (typeof str !== 'string')
        return false;
    const date = new Date(str);
    return !isNaN(date.getTime());
}
//# sourceMappingURL=videoInputToValidation.js.map