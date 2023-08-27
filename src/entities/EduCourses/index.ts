export { fetchEduCourses } from './model/services/fetchEduCourses/fetchEduCourses';

export { EduCourses } from './ui/EduCourses';

export { getEduCoursesLimit } from './model/selectors/getEduCoursesLimit/getEduCoursesLimit';
export { getEduCoursesPage } from './model/selectors/getEduCoursesPage/getEduCoursesPage';

export { getEduCoursesData } from './model/selectors/getEduCoursesData/getEduCoursesData';
export { getEduCoursesError } from './model/selectors/getEduCoursesError/getEduCoursesError';
export {
    getEduCoursesIsLoading,
} from './model/selectors/getEduCoursesIsLoading/getEduCoursesIsLoading';

export { eduCoursesActions, eduCoursesReducer } from './model/slice/eduCoursesSlice';

export {
    EduCoursesSchema, EduCoursesData, EduCoursesError, EduCoursesType,
} from './model/types/eduCourses';
