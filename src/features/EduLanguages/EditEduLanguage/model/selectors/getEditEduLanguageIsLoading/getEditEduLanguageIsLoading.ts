import { StateSchema } from 'app/providers/StoreProvider';

export const getEditEduLanguageIsLoading = (state: StateSchema) => state.editEduLanguage?.isLoading;
