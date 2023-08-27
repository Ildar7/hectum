import { StateSchema } from 'app/providers/StoreProvider';

export const getImportStudentsColumnsFromFile = (state: StateSchema) => state.importStudents?.columnsFromFile;
