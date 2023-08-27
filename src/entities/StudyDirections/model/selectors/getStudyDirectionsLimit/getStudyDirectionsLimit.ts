import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDirectionsLimit = (state: StateSchema) => state.studyDirections?.limit;
