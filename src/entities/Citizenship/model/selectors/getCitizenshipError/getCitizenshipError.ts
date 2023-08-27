import { StateSchema } from 'app/providers/StoreProvider';

export const getCitizenshipError = (state: StateSchema) => state.citizenship?.error;
