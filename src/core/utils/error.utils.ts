import {ValidationError} from "../../videos/types/validationsErrors";
export const createErrorMessages= (
    errors: ValidationError[],
): { errorsMessages: ValidationError[] } => {
    return { errorsMessages: errors };
};