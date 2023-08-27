import { StateSchema } from 'app/providers/StoreProvider';

export const getNationalityDetailError = (state: StateSchema) => state.nationalityDetail?.error;
