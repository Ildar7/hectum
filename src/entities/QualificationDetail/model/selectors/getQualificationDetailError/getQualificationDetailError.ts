import { StateSchema } from 'app/providers/StoreProvider';

export const getQualificationDetailError = (state: StateSchema) => state.qualificationDetail?.error;
