import { StateSchema } from 'app/providers/StoreProvider';

export const getEditEduLanguageError = (state: StateSchema) => state.editEduLanguage?.errors;
