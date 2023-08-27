import { StateSchema } from 'app/providers/StoreProvider';

export const getStudentsData = (state: StateSchema) => state.students.data;
