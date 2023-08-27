import { StateSchema } from 'app/providers/StoreProvider';

export const getEnrollmentTypeDetailError = (state: StateSchema) => state.enrollmentTypeDetail?.error;
