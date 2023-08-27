import { StateSchema } from 'app/providers/StoreProvider';

export const getAddStudyDurationTitle = (state: StateSchema) => state.addStudyDuration?.data.title;
