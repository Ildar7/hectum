import { StateSchema } from 'app/providers/StoreProvider';

export const getEduLanguagesPage = (state: StateSchema) => state.eduLanguages?.page;
