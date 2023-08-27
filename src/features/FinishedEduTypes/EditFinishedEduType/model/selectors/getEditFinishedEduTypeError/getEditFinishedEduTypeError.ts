import { StateSchema } from 'app/providers/StoreProvider';

export const getEditFinishedEduTypeError = (state: StateSchema) => state.editFinishedEduType?.errors;
