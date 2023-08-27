import { StateSchema } from 'app/providers/StoreProvider';

export const getStudentsPage = (state: StateSchema) => state.students.page;
