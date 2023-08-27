export {
    getEnrollmentTypeDetailError,
} from './model/selectors/getEnrollmentTypeDetailError/getEnrollmentTypeDetailError';
export {
    getEnrollmentTypeDetailIsLoading,
} from './model/selectors/getEnrollmentTypeDetailIsLoading/getEnrollmentTypeDetailIsLoading';
export {
    getEnrollmentTypeDetailData,
} from './model/selectors/getEnrollmentTypeDetailData/getEnrollmentTypeDetailData';
export {
    fetchEnrollmentTypeDetail,
} from './model/services/fetchEnrollmentTypeDetail/fetchEnrollmentTypeDetail';

export { enrollmentTypeDetailActions, enrollmentTypeDetailReducer } from './model/slice/enrollmentTypeDetailSlice';

export { EnrollmentTypeDetailSchema, EnrollmentTypeDetailType } from './model/types/enrollmentTypeDetail';
