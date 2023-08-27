import { StateSchema } from 'app/providers/StoreProvider';

export const getTableSortOrderField = (state: StateSchema) => state.tableSort?.order;
