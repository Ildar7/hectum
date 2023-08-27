import { StateSchema } from 'app/providers/StoreProvider';

export const getAddQualificationIsLoading = (state: StateSchema) => state.addQualification?.isLoading;
