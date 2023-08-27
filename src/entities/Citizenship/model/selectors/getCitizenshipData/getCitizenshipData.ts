import { StateSchema } from 'app/providers/StoreProvider';

export const getCitizenshipData = (state: StateSchema) => state.citizenship?.data;
