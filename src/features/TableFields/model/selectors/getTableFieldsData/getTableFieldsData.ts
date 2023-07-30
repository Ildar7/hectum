import { StateSchema } from 'app/providers/StoreProvider';

export const getTableFieldsData = (state: StateSchema) => state.tableFields?.data;
