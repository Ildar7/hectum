import {
    getRouteCitizenship, getRouteEduCourses, getRouteEduLanguages,
    getRouteEnrollmentTypes, getRouteFinishedEduTypes,
    getRouteNationalities, getRouteQualifications,
    getRouteStudents, getRouteStudyDirections, getRouteStudyDurations,
} from 'shared/const/router';

export const students = [
    {
        name: 'Студенты',
        pathname: getRouteStudents(),
    },
    {
        name: 'Типы зачисления',
        pathname: getRouteEnrollmentTypes(),
    },
    {
        name: 'Гражданство',
        pathname: getRouteCitizenship(),
    },
    {
        name: 'Национальности',
        pathname: getRouteNationalities(),
    },
    {
        name: 'Язык обучения',
        pathname: getRouteEduLanguages(),
    },
    {
        name: 'Типы окончания обучения',
        pathname: getRouteFinishedEduTypes(),
    },
    {
        name: 'Номер учебного курса',
        pathname: getRouteEduCourses(),
    },
    {
        name: 'Студенческое направление',
        pathname: getRouteStudyDirections(),
    },
    {
        name: 'Продолжительность обучения',
        pathname: getRouteStudyDurations(),
    },
    {
        name: 'Квалификация',
        pathname: getRouteQualifications(),
    },
];
