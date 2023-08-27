import { StateSchema } from 'app/providers/StoreProvider';

export const getEduLanguagesIsLoading = (state: StateSchema) => state.eduLanguages?.isLoading;
