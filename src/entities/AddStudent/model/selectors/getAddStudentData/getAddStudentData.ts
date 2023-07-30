import { StateSchema } from 'app/providers/StoreProvider';

export const getAddStudentData = (state: StateSchema) => state.addNewStudent?.data;
