import { StateSchema } from 'app/providers/StoreProvider';

export const getEditStudyDurationData = (state: StateSchema) => state.editStudyDuration?.data;
