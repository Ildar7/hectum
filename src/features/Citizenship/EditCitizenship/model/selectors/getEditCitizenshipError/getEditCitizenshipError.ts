import { StateSchema } from 'app/providers/StoreProvider';

export const getEditCitizenshipError = (state: StateSchema) => state.editCitizenship?.errors;
