import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDurationsError = (state: StateSchema) => state.studyDurations?.error;
