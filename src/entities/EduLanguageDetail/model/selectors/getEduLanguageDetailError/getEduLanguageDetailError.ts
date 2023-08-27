import { StateSchema } from 'app/providers/StoreProvider';

export const getEduLanguageDetailError = (state: StateSchema) => state.eduLanguagesDetail?.error;
