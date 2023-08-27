import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDurationsLimit = (state: StateSchema) => state.studyDurations?.limit;
