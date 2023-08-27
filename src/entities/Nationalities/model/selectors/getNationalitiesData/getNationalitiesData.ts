import { StateSchema } from 'app/providers/StoreProvider';

export const getNationalitiesData = (state: StateSchema) => state.nationalities?.data;
