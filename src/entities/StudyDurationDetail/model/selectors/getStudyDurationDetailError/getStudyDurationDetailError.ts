import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDurationDetailError = (state: StateSchema) => state.studyDurationDetail?.error;
