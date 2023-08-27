import { StateSchema } from 'app/providers/StoreProvider';

export const getUserAuthToken = (state: StateSchema) => state.user.token;
