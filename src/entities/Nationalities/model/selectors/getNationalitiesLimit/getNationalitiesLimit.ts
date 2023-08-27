import { StateSchema } from 'app/providers/StoreProvider';

export const getNationalitiesLimit = (state: StateSchema) => state.nationalities?.limit;
