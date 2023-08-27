import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDurationsPage = (state: StateSchema) => state.studyDurations?.page;
