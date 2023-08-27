import { StateSchema } from 'app/providers/StoreProvider';

export const getStudentDetailError = (state: StateSchema) => state.studentDetail?.error;
