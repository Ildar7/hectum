import { StateSchema } from 'app/providers/StoreProvider';

export const getEditCitizenshipNewFieldsData = (state: StateSchema) => state.editCitizenship?.newFields;
