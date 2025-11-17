import { ResourceType } from "../../core/types/resource-type";
import { Resolutions } from "../types/video";
export type VideoListOutput = {
    meta: {};
    data: {
        type: ResourceType.Videos;
        id: number;
        attributes: {
            title: string;
            author: string;
            canBeDownloaded: boolean;
            minAgeRestriction: number | null;
            createdAt: string;
            publicationDate: string;
            availableResolutions: Resolutions[];
        };
    }[];
};
//# sourceMappingURL=video-list.output.d.ts.map