import { StateSchema } from 'app/providers/StoreProvider';

export const getEditStudyDurationNewFieldsData = (state: StateSchema) => state.editStudyDuration?.newFields?.title;
