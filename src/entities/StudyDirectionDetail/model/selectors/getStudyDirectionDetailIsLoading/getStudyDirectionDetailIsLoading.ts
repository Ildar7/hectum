import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDirectionDetailIsLoading = (state: StateSchema) => state.studyDirectionDetail?.isLoading;
