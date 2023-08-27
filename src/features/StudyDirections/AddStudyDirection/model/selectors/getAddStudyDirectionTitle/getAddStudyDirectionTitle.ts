import { StateSchema } from 'app/providers/StoreProvider';

export const getAddStudyDirectionTitle = (state: StateSchema) => state.addStudyDirection?.data.title;
