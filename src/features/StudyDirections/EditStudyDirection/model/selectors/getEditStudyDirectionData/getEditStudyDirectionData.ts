import { StateSchema } from 'app/providers/StoreProvider';

export const getEditStudyDirectionData = (state: StateSchema) => state.editStudyDirection?.data;
