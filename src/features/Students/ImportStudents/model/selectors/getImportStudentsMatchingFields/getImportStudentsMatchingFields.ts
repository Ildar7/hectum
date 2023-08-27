import { StateSchema } from 'app/providers/StoreProvider';

export const getImportStudentsMatchingFields = (state: StateSchema) => state.importStudents?.matchingFields;
