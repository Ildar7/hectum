import { StateSchema } from 'app/providers/StoreProvider';

export const getFinishedEduTypeDetailData = (state: StateSchema) => state.finishedEduTypesDetail?.data;
