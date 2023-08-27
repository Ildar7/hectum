import { StateSchema } from 'app/providers/StoreProvider';

export const getCitizenshipDetailData = (state: StateSchema) => state.citizenshipDetail?.data;
