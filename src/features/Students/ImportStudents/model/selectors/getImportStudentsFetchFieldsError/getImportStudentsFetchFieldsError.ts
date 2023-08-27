import { StateSchema } from 'app/providers/StoreProvider';

export const getImportStudentsFetchFieldsError = (state: StateSchema) => state.importStudents?.errorFetchFields;
