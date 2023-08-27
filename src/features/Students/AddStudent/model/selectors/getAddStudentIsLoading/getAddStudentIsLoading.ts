import { StateSchema } from 'app/providers/StoreProvider';

export const getAddStudentIsLoading = (state: StateSchema) => state.addNewStudent?.isLoading;
