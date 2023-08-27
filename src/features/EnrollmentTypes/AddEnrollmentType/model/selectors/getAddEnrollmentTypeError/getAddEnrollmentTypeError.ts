import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEnrollmentTypeError = (state: StateSchema) => state.addEnrollmentType?.errors;
