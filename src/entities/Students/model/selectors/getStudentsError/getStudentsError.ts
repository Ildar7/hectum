import { StateSchema } from 'app/providers/StoreProvider';

export const getStudentsError = (state: StateSchema) => state.students.error;
