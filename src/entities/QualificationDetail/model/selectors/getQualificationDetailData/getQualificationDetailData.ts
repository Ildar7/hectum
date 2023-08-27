import { StateSchema } from 'app/providers/StoreProvider';

export const getQualificationDetailData = (state: StateSchema) => state.qualificationDetail?.data;
