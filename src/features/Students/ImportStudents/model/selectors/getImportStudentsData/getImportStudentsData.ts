import { StateSchema } from 'app/providers/StoreProvider';

export const getImportStudentsData = (state: StateSchema) => state.importStudents?.data;
