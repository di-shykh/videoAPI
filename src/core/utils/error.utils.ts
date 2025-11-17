import {ValidationError} from "../../videos/types/validationsErrors";
export const createErrorMessages= (
    errors: ValidationError[],
): { errorMessages: ValidationError[] } => {
    return { errorMessages: errors };
};