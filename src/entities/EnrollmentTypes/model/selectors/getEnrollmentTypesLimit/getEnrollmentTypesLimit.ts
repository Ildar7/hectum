import { StateSchema } from 'app/providers/StoreProvider';

export const getEnrollmentTypesLimit = (state: StateSchema) => state.enrollmentTypes?.limit;
