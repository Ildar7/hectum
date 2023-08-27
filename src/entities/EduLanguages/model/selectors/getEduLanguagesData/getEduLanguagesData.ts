import { StateSchema } from 'app/providers/StoreProvider';

export const getEduLanguagesData = (state: StateSchema) => state.eduLanguages?.data;
