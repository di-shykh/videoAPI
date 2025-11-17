import { Resolutions } from "../types/video";
export type VideoInput = {
    title: string;
    author: string;
    availableResolutions: Resolutions[];
    canBeDownloaded?: boolean;
    minAgeRestriction?: number | null;
    createdAt?: string;
    publicationDate?: string;
};
//# sourceMappingURL=video.input.d.ts.map