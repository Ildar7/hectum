import { StateSchema } from 'app/providers/StoreProvider';

export const getEduLanguageDetailData = (state: StateSchema) => state.eduLanguagesDetail?.data;
