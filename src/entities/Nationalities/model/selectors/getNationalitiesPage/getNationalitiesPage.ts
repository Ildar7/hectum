import { StateSchema } from 'app/providers/StoreProvider';

export const getNationalitiesPage = (state: StateSchema) => state.nationalities?.page;
