import { StateSchema } from 'app/providers/StoreProvider';

export const getStudentDetailIsLoading = (state: StateSchema) => state.studentDetail?.isLoading;
