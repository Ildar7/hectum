import { StateSchema } from 'app/providers/StoreProvider';

export const getCitizenshipIsLoading = (state: StateSchema) => state.citizenship?.isLoading;
