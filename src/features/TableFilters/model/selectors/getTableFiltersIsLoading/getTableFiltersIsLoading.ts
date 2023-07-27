import { StateSchema } from 'app/providers/StoreProvider';

export const getTableFiltersIsLoading = (state: StateSchema) => state.tableFilters?.isLoading;
