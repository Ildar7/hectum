import { StateSchema } from 'app/providers/StoreProvider';

export const getEnrollmentTypesError = (state: StateSchema) => state.enrollmentTypes?.error;
