import { StateSchema } from 'app/providers/StoreProvider';

export const getEditEduLanguageData = (state: StateSchema) => state.editEduLanguage?.data;
