import { StateSchema } from 'app/providers/StoreProvider';

export const getAddCitizenshipCountryId = (state: StateSchema) => state.addCitizenship?.data.country_id;
