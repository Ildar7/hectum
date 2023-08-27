import { StateSchema } from 'app/providers/StoreProvider';

export const getAddStudyDurationIsLoading = (state: StateSchema) => state.addStudyDuration?.isLoading;
