import { StateSchema } from 'app/providers/StoreProvider';

export const getEditEduLanguageNewFieldsData = (state: StateSchema) => state.editEduLanguage?.newFields?.title;
