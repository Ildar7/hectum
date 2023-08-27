import { StateSchema } from 'app/providers/StoreProvider';

export const getEnrollmentTypesIsLoading = (state: StateSchema) => state.enrollmentTypes?.isLoading;
