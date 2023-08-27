import { StateSchema } from 'app/providers/StoreProvider';

export const getEditStudyDurationIsLoading = (state: StateSchema) => state.editStudyDuration?.isLoading;
