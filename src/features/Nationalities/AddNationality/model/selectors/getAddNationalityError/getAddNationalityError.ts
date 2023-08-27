import { StateSchema } from 'app/providers/StoreProvider';

export const getAddNationalityError = (state: StateSchema) => state.addNationality?.errors;
