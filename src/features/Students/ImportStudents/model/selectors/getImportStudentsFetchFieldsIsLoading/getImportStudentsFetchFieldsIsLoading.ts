import { StateSchema } from 'app/providers/StoreProvider';

export const getImportStudentsFetchFieldsIsLoading = (state: StateSchema) => state.importStudents?.isLoadingFetchFields;
