import { StateSchema } from 'app/providers/StoreProvider';

export const getEditEnrollmentTypeIsLoading = (state: StateSchema) => state.editEnrollmentType?.isLoading;
