import { StateSchema } from 'app/providers/StoreProvider';

export const getEditStudyDirectionNewFieldsData = (state: StateSchema) => state.editStudyDirection?.newFields?.title;
