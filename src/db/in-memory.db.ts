import {Resolutions, Video} from "../videos/types/video";

export const db = {
    videos: <Video[]>[
        {
            id: 1,
            title:	'video1',
            author:	'Artem',
            canBeDownloaded: false,
            minAgeRestriction:	null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            availableResolutions: [Resolutions.P144, Resolutions.P240,Resolutions.P480]
        },
        {
            id: 2,
            title:	'video2',
            author:	'Diana',
            canBeDownloaded: true,
            minAgeRestriction:	18,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            availableResolutions: [Resolutions.P1080, Resolutions.P1440,Resolutions.P2160]
        },
        {
            id: 3,
            title:	'video3',
            author:	'Vasiliy',
            canBeDownloaded: false,
            minAgeRestriction:	16,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            availableResolutions: [Resolutions.P720]
        }
    ]
};