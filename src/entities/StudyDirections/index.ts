export { fetchStudyDirections } from './model/services/fetchStudyDirections/fetchStudyDirections';

export { StudyDirections } from './ui/StudyDirections';

export { getStudyDirectionsLimit } from './model/selectors/getStudyDirectionsLimit/getStudyDirectionsLimit';
export { getStudyDirectionsPage } from './model/selectors/getStudyDirectionsPage/getStudyDirectionsPage';

export { getStudyDirectionsData } from './model/selectors/getStudyDirectionsData/getStudyDirectionsData';
export { getStudyDirectionsError } from './model/selectors/getStudyDirectionsError/getStudyDirectionsError';
export {
    getStudyDirectionsIsLoading,
} from './model/selectors/getStudyDirectionsIsLoading/getStudyDirectionsIsLoading';

export { studyDirectionsActions, studyDirectionsReducer } from './model/slice/studyDirectionsSlice';

export {
    StudyDirectionsSchema, StudyDirectionsData, StudyDirectionsError, StudyDirectionsType,
} from './model/types/studyDirections';
