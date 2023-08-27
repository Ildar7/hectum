import { StateSchema } from 'app/providers/StoreProvider';

export const getNationalitiesIsLoading = (state: StateSchema) => state.nationalities?.isLoading;
