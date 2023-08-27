import { StateSchema } from 'app/providers/StoreProvider';

export const getEnrollmentTypesPage = (state: StateSchema) => state.enrollmentTypes?.page;
