import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDirectionsError = (state: StateSchema) => state.studyDirections?.error;
