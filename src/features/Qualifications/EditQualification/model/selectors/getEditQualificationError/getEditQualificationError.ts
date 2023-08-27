import { StateSchema } from 'app/providers/StoreProvider';

export const getEditQualificationError = (state: StateSchema) => state.editQualification?.errors;
