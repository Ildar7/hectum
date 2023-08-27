import { StateSchema } from 'app/providers/StoreProvider';

export const getAddStudyDirectionIsLoading = (state: StateSchema) => state.addStudyDirection?.isLoading;
