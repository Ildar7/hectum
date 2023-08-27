import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDurationsIsLoading = (state: StateSchema) => state.studyDurations?.isLoading;
