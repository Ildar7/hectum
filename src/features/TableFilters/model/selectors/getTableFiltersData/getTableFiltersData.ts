import { StateSchema } from 'app/providers/StoreProvider';

export const getTableFiltersData = (state: StateSchema) => state.tableFilters?.data;
