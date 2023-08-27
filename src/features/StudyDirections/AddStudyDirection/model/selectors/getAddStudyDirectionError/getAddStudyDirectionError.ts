import { StateSchema } from 'app/providers/StoreProvider';

export const getAddStudyDirectionError = (state: StateSchema) => state.addStudyDirection?.errors;
