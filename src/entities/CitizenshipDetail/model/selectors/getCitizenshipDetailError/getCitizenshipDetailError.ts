import { StateSchema } from 'app/providers/StoreProvider';

export const getCitizenshipDetailError = (state: StateSchema) => state.citizenshipDetail?.error;
