import { StateSchema } from 'app/providers/StoreProvider';

export const getEditCitizenshipData = (state: StateSchema) => state.editCitizenship?.data;
