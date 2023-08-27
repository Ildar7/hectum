export { fetchStudyDurations } from './model/services/fetchStudyDurations/fetchStudyDurations';

export { StudyDurations } from './ui/StudyDurations';

export { getStudyDurationsLimit } from './model/selectors/getStudyDurationsLimit/getStudyDurationsLimit';
export { getStudyDurationsPage } from './model/selectors/getStudyDurationsPage/getStudyDurationsPage';

export { getStudyDurationsData } from './model/selectors/getStudyDurationsData/getStudyDurationsData';
export { getStudyDurationsError } from './model/selectors/getStudyDurationsError/getStudyDurationsError';
export {
    getStudyDurationsIsLoading,
} from './model/selectors/getStudyDurationsIsLoading/getStudyDurationsIsLoading';

export { studyDurationsActions, studyDurationsReducer } from './model/slice/studyDurationsSlice';

export {
    StudyDurationsSchema, StudyDurationsData, StudyDurationsError, StudyDurationsType,
} from './model/types/studyDurations';
