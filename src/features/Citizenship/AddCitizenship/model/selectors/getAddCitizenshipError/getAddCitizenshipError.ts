import { StateSchema } from 'app/providers/StoreProvider';

export const getAddCitizenshipError = (state: StateSchema) => state.addCitizenship?.errors;
