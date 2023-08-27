import { StateSchema } from 'app/providers/StoreProvider';

export const getAddFinishedEduTypeError = (state: StateSchema) => state.addFinishedEduType?.errors;
