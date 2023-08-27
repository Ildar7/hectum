import { StateSchema } from 'app/providers/StoreProvider';

export const getEditStudentData = (state: StateSchema) => state.editStudent?.data;
