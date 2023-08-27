import { StateSchema } from 'app/providers/StoreProvider';

export const getNationalityDetailIsLoading = (state: StateSchema) => state.nationalityDetail?.isLoading;
