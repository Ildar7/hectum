import { StateSchema } from 'app/providers/StoreProvider';

export const getTableFiltersSelectedData = (state: StateSchema) => state.tableFiltersSelected?.data;
