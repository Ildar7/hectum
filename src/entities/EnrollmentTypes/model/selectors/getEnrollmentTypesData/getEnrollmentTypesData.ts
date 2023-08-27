import { StateSchema } from 'app/providers/StoreProvider';

export const getEnrollmentTypesData = (state: StateSchema) => state.enrollmentTypes?.data;
