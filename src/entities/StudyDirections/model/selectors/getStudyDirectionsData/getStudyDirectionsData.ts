import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDirectionsData = (state: StateSchema) => state.studyDirections?.data;
