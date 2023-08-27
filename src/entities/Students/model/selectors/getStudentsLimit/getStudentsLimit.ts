import { StateSchema } from 'app/providers/StoreProvider';

export const getStudentsLimit = (state: StateSchema) => state.students.limit;
