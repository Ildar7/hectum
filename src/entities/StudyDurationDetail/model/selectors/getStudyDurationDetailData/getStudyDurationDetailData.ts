import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDurationDetailData = (state: StateSchema) => state.studyDurationDetail?.data;
