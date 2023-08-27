import { StateSchema } from 'app/providers/StoreProvider';

export const getAddStudentErrors = (state: StateSchema) => state.addNewStudent?.errors;
