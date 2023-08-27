import { StateSchema } from 'app/providers/StoreProvider';

export const getEditStudentIsLoading = (state: StateSchema) => state.editStudent?.isLoading;
