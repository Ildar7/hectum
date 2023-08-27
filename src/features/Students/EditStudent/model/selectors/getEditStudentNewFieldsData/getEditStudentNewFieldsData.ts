import { StateSchema } from 'app/providers/StoreProvider';

export const getEditStudentNewFieldsData = (state: StateSchema) => state.editStudent?.newFields;
