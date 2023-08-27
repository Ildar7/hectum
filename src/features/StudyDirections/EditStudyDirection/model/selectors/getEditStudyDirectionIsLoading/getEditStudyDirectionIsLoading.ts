import { StateSchema } from 'app/providers/StoreProvider';

export const getEditStudyDirectionIsLoading = (state: StateSchema) => state.editStudyDirection?.isLoading;
