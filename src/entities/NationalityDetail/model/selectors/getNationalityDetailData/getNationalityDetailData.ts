import { StateSchema } from 'app/providers/StoreProvider';

export const getNationalityDetailData = (state: StateSchema) => state.nationalityDetail?.data;
