import { StateSchema } from 'app/providers/StoreProvider';

export const getAddQualificationTitle = (state: StateSchema) => state.addQualification?.data.title;
