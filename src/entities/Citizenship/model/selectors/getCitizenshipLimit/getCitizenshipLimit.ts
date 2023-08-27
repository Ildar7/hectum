import { StateSchema } from 'app/providers/StoreProvider';

export const getCitizenshipLimit = (state: StateSchema) => state.citizenship?.limit;
