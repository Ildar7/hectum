import { StateSchema } from 'app/providers/StoreProvider';

export const getEditStudentErrors = (state: StateSchema) => state.editStudent?.errors;
