import { StateSchema } from 'app/providers/StoreProvider';

export const getEditStudyDirectionError = (state: StateSchema) => state.editStudyDirection?.errors;
