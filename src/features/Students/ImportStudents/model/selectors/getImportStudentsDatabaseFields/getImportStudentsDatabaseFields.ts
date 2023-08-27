import { StateSchema } from 'app/providers/StoreProvider';

export const getImportStudentsDatabaseFields = (state: StateSchema) => state.importStudents?.databaseFields;
