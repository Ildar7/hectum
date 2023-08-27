import { StateSchema } from 'app/providers/StoreProvider';

export const getAddNationalityIsLoading = (state: StateSchema) => state.addNationality?.isLoading;
