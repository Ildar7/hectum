import { StateSchema } from 'app/providers/StoreProvider';

export const getEnrollmentTypeDetailData = (state: StateSchema) => state.enrollmentTypeDetail?.data;
