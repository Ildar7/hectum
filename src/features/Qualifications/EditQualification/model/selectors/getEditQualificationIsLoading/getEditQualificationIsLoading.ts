import { StateSchema } from 'app/providers/StoreProvider';

export const getEditQualificationIsLoading = (state: StateSchema) => state.editQualification?.isLoading;
