import { StateSchema } from 'app/providers/StoreProvider';

export const getAddQualificationCode = (state: StateSchema) => state.addQualification?.data.code;
