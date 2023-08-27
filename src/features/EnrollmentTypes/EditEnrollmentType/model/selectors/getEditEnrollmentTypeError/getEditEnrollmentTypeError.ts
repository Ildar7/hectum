import { StateSchema } from 'app/providers/StoreProvider';

export const getEditEnrollmentTypeError = (state: StateSchema) => state.editEnrollmentType?.errors;
