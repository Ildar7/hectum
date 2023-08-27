import { StateSchema } from 'app/providers/StoreProvider';

export const getAddCitizenshipName = (state: StateSchema) => state.addCitizenship?.data.name;
