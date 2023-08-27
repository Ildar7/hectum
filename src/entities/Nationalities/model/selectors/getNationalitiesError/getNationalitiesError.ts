import { StateSchema } from 'app/providers/StoreProvider';

export const getNationalitiesError = (state: StateSchema) => state.nationalities?.error;
