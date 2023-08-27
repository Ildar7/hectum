import { StateSchema } from 'app/providers/StoreProvider';

export const getStudyDirectionsPage = (state: StateSchema) => state.studyDirections?.page;
