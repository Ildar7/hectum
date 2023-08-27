import { StateSchema } from 'app/providers/StoreProvider';

export const getEditNationalityError = (state: StateSchema) => state.editNationality?.errors;
