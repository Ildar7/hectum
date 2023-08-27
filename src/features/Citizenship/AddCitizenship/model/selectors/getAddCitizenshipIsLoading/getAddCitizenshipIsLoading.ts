import { StateSchema } from 'app/providers/StoreProvider';

export const getAddCitizenshipIsLoading = (state: StateSchema) => state.addCitizenship?.isLoading;
