import { StateSchema } from 'app/providers/StoreProvider';

export const getAddNationalityTitle = (state: StateSchema) => state.addNationality?.data.title;
