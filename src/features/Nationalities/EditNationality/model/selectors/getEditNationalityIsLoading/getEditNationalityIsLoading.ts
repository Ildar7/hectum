import { StateSchema } from 'app/providers/StoreProvider';

export const getEditNationalityIsLoading = (state: StateSchema) => state.editNationality?.isLoading;
