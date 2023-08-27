import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEduLanguageTitle = (state: StateSchema) => state.addEduLanguage?.data.title;
