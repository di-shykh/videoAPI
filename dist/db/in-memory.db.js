"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const video_1 = require("../videos/types/video");
exports.db = {
    videos: [
        {
            id: 1,
            title: 'video1',
            author: 'Artem',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            availableResolutions: [video_1.Resolutions.P144, video_1.Resolutions.P240, video_1.Resolutions.P480]
        },
        {
            id: 2,
            title: 'video2',
            author: 'Diana',
            canBeDownloaded: true,
            minAgeRestriction: 18,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            availableResolutions: [video_1.Resolutions.P1080, video_1.Resolutions.P1440, video_1.Resolutions.P2160]
        },
        {
            id: 3,
            title: 'video3',
            author: 'Vasiliy',
            canBeDownloaded: false,
            minAgeRestriction: 16,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            availableResolutions: [video_1.Resolutions.P720]
        }
    ]
};
//# sourceMappingURL=in-memory.db.js.map