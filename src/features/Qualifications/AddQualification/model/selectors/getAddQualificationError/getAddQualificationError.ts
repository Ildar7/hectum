import { StateSchema } from 'app/providers/StoreProvider';

export const getAddQualificationError = (state: StateSchema) => state.addQualification?.errors;
