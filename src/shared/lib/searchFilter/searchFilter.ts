import { StudentsType } from 'entities/Students';
import { EnrollmentTypesType } from 'entities/EnrollmentTypes';
import { CitizenshipType } from 'entities/Citizenship';
import { NationalitiesType } from 'entities/Nationalities';
import { EduLanguagesType } from 'entities/EduLanguages';
import { FinishedEduTypesType } from 'entities/FinishedEduTypes';
import { EduCoursesType } from 'entities/EduCourses';
import { StudyDirectionsType } from 'entities/StudyDirections';
import { StudyDurationsType } from 'entities/StudyDurations';
import { QualificationsType } from 'entities/Qualifications';

export const studentSearchFilter = (searchText: string, studentsList: StudentsType[]) => {
    if (!searchText) {
        return studentsList;
    }

    return studentsList.filter(({ fio }) => (fio.toLowerCase().includes(searchText.toLowerCase())));
};

export const enrollmentTypesSearchFilter = (searchText: string, enrollmentTypesList: EnrollmentTypesType[]) => {
    if (!searchText) {
        return enrollmentTypesList;
    }

    return enrollmentTypesList.filter(({ typeenrollment }) => (typeenrollment.toLowerCase().includes(searchText.toLowerCase())));
};

export const citizenshipSearchFilter = (searchText: string, citizenshipList: CitizenshipType[]) => {
    if (!searchText) {
        return citizenshipList;
    }

    return citizenshipList.filter(({ citizenship }) => (citizenship.toLowerCase().includes(searchText.toLowerCase())));
};

export const nationalitiesSearchFilter = (searchText: string, nationalitiesList: NationalitiesType[]) => {
    if (!searchText) {
        return nationalitiesList;
    }

    return nationalitiesList.filter(({ nationality }) => (nationality.toLowerCase().includes(searchText.toLowerCase())));
};

export const eduLanguagesSearchFilter = (searchText: string, eduLanguagesList: EduLanguagesType[]) => {
    if (!searchText) {
        return eduLanguagesList;
    }

    return eduLanguagesList.filter(({ languageofedu }) => (languageofedu.toLowerCase().includes(searchText.toLowerCase())));
};

export const finishedEduTypesSearchFilter = (searchText: string, finishedEduTypesList: FinishedEduTypesType[]) => {
    if (!searchText) {
        return finishedEduTypesList;
    }

    return finishedEduTypesList
        .filter(({ fromacceptedfinished }) => (fromacceptedfinished.toLowerCase().includes(searchText.toLowerCase())));
};

export const eduCoursesSearchFilter = (searchText: string, eduCoursesList: EduCoursesType[]) => {
    if (!searchText) {
        return eduCoursesList;
    }

    return eduCoursesList
        .filter(({ courseoftraining }) => (courseoftraining.toLowerCase().includes(searchText.toLowerCase())));
};

export const studyDirectionsSearchFilter = (searchText: string, studyDirectionsList: StudyDirectionsType[]) => {
    if (!searchText) {
        return studyDirectionsList;
    }

    return studyDirectionsList
        .filter(({ typeofdirection }) => (typeofdirection.toLowerCase().includes(searchText.toLowerCase())));
};

export const studyDurationsSearchFilter = (searchText: string, studyDurationsList: StudyDurationsType[]) => {
    if (!searchText) {
        return studyDurationsList;
    }

    return studyDurationsList
        .filter(({ durationoftraining }) => (durationoftraining.toLowerCase().includes(searchText.toLowerCase())));
};

export const qualificationsSearchFilter = (searchText: string, qualificationsList: QualificationsType[]) => {
    if (!searchText) {
        return qualificationsList;
    }

    return qualificationsList
        .filter(({ qualification }) => (qualification.toLowerCase().includes(searchText.toLowerCase())));
};
