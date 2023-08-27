import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDirectionsIsLoading = (state: StateSchema) => state.studyDirections?.isLoading;
