import { StateSchema } from 'app/providers/StoreProvider';

export const getEditNationalityData = (state: StateSchema) => state.editNationality?.data;
