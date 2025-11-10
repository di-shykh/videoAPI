import {ResourceType} from "../../core/types/resource-type";
import {Resolutions} from "../types/video";

export type VideoCreateInput = {
    data: {
        type: ResourceType.Videos;
        attributes: {
            title:	string;
            author:	string;
            canBeDownloaded: boolean;
            minAgeRestriction:	number|null;
            createdAt: string;
            publicationDate: string;
            availableResolutions: Resolutions[]
        }
    }
}