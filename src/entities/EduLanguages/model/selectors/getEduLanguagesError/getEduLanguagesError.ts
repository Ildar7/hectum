import { StateSchema } from 'app/providers/StoreProvider';

export const getEduLanguagesError = (state: StateSchema) => state.eduLanguages?.error;
