import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDurationDetailIsLoading = (state: StateSchema) => state.studyDurationDetail?.isLoading;
