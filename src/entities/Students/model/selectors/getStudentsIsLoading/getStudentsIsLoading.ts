import { StateSchema } from 'app/providers/StoreProvider';

export const getStudentsIsLoading = (state: StateSchema) => state.students.isLoading;
