import { StateSchema } from 'app/providers/StoreProvider';

export const getQualificationDetailIsLoading = (state: StateSchema) => state.qualificationDetail?.isLoading;
