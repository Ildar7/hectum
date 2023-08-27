import { StateSchema } from 'app/providers/StoreProvider';

export const getTableSortField = (state: StateSchema) => state.tableSort?.sort;
