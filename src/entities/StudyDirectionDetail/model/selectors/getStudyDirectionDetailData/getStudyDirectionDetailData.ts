import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDirectionDetailData = (state: StateSchema) => state.studyDirectionDetail?.data;
