import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEduLanguageError = (state: StateSchema) => state.addEduLanguage?.errors;
