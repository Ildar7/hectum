import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEnrollmentTypeIsLoading = (state: StateSchema) => state.addEnrollmentType?.isLoading;
