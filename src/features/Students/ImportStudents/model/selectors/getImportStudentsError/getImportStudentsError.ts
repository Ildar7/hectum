import { StateSchema } from 'app/providers/StoreProvider';

export const getImportStudentsError = (state: StateSchema) => state.importStudents?.error;
