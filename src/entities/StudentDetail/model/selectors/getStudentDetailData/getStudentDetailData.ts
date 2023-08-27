import { StateSchema } from 'app/providers/StoreProvider';

export const getStudentDetailData = (state: StateSchema) => state.studentDetail?.data;
