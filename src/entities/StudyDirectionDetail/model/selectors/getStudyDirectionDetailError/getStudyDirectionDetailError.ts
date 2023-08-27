import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDirectionDetailError = (state: StateSchema) => state.studyDirectionDetail?.error;
