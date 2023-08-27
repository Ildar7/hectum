import { StateSchema } from 'app/providers/StoreProvider';

export const getEditCitizenshipIsLoading = (state: StateSchema) => state.editCitizenship?.isLoading;
