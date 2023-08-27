import { StateSchema } from 'app/providers/StoreProvider';

export const getEduLanguageDetailIsLoading = (state: StateSchema) => state.eduLanguagesDetail?.isLoading;
