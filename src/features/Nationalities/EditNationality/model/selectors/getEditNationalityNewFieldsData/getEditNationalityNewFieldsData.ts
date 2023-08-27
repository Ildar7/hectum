import { StateSchema } from 'app/providers/StoreProvider';

export const getEditNationalityNewFieldsData = (state: StateSchema) => state.editNationality?.newFields?.title;
