import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEduLanguageIsLoading = (state: StateSchema) => state.addEduLanguage?.isLoading;
