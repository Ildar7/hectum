export {
    getQualificationDetailError,
} from './model/selectors/getQualificationDetailError/getQualificationDetailError';
export {
    getQualificationDetailIsLoading,
} from './model/selectors/getQualificationDetailIsLoading/getQualificationDetailIsLoading';
export {
    getQualificationDetailData,
} from './model/selectors/getQualificationDetailData/getQualificationDetailData';
export {
    fetchQualificationDetail,
} from './model/services/fetchQualificationDetail/fetchQualificationDetail';

export { qualificationDetailActions, qualificationDetailReducer } from './model/slice/qualificationDetailSlice';

export { QualificationDetailSchema, QualificationDetailType } from './model/types/qualificationDetail';
