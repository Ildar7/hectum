import { StateSchema } from 'app/providers/StoreProvider';

export const getTableFiltersError = (state: StateSchema) => state.tableFilters?.error;
