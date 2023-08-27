import { StateSchema } from 'app/providers/StoreProvider';

export const getCitizenshipDetailIsLoading = (state: StateSchema) => state.citizenshipDetail?.isLoading;
