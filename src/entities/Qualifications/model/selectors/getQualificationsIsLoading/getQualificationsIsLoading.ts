import { StateSchema } from 'app/providers/StoreProvider';

export const getQualificationsIsLoading = (state: StateSchema) => state.qualifications?.isLoading;
