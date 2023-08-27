import { StateSchema } from 'app/providers/StoreProvider';

export const getAddQualificationId = (state: StateSchema) => state.addQualification?.data.speciality_id;
