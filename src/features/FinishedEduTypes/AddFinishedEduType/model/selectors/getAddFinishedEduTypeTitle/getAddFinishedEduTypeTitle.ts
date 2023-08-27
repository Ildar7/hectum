import { StateSchema } from 'app/providers/StoreProvider';

export const getAddFinishedEduTypeTitle = (state: StateSchema) => state.addFinishedEduType?.data.title;
