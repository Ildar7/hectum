import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDurationsData = (state: StateSchema) => state.studyDurations?.data;
