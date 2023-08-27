export enum AppRoutes {
    MAIN = 'main',
    STUDENTS = 'students',
    IMPORT_STUDENTS = 'import_students',
    ENROLLMENT_TYPES = 'enrollment_types',
    CITIZENSHIP = 'citizenship',
    NATIONALITIES = 'nationalities',
    EDU_LANGUAGES = 'edu_languages',
    FINISHED_EDU_TYPES = 'finished_edu_types',
    EDU_COURSES = 'edu_courses',
    STUDY_DIRECTIONS = 'study_directions',
    STUDY_DURATIONS = 'study_durations',
    QUALIFICATIONS = 'qualifications',
    LOGIN = 'login',

    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteStudents = () => '/students';
export const getRouteImportStudents = () => '/students/import';
export const getRouteEnrollmentTypes = () => '/students/enrollment-types';
export const getRouteCitizenship = () => '/students/citizenship';
export const getRouteNationalities = () => '/students/nationalities';
export const getRouteEduLanguages = () => '/students/edu-languages';
export const getRouteFinishedEduTypes = () => '/students/finished-edu-types';
export const getRouteEduCourses = () => '/students/edu-courses';
export const getRouteStudyDirections = () => '/students/study-directions';
export const getRouteStudyDurations = () => '/students/study-durations';
export const getRouteQualifications = () => '/students/qualifications';

export const getRouteLogin = () => '/login';
