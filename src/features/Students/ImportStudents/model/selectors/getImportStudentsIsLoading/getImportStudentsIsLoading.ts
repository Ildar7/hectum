import { StateSchema } from 'app/providers/StoreProvider';

export const getImportStudentsIsLoading = (state: StateSchema) => state.importStudents?.isLoading;
