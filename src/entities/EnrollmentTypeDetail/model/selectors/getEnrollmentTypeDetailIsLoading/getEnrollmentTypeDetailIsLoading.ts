import { StateSchema } from 'app/providers/StoreProvider';

export const getEnrollmentTypeDetailIsLoading = (state: StateSchema) => state.enrollmentTypeDetail?.isLoading;
