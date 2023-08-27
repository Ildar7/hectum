import { StateSchema } from 'app/providers/StoreProvider';

export const getCitizenshipPage = (state: StateSchema) => state.citizenship?.page;
