import { StateSchema } from 'app/providers/StoreProvider';

export const getEduLanguagesLimit = (state: StateSchema) => state.eduLanguages?.limit;
