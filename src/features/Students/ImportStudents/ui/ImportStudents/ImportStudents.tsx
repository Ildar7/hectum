import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, { useCallback, useEffect, useState } from 'react';
import { CButton } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { getRouteStudents } from 'shared/const/router';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import {
    Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import { ImportStudentsProcessing } from '../ImportStudentsProcessing/ImportStudentsProcessing';
import {
    ImportStudentsSelectFields,
} from '../ImportStudentsSelectFields/ImportStudentsSelectFields';
import { fetchImportStudentsFields } from '../../model/services/fetchImportStudentsFields/fetchImportStudentsFields';
import { ImportStudentsFileSelection } from '../ImportStudentsFileSelection/ImportStudentsFileSelection';
import { ImportStudentsNav } from '../ImportStudentsNav/ImportStudentsNav';
import cls from './ImportStudents.module.scss';
import {
    getImportStudentsFetchFieldsError,
} from '../../model/selectors/getImportStudentsFetchFieldsError/getImportStudentsFetchFieldsError';
import {
    getImportStudentsFetchFieldsIsLoading,
} from '../../model/selectors/getImportStudentsFetchFieldsIsLoading/getImportStudentsFetchFieldsIsLoading';
import { ImportStudentsFinishing } from '../ImportStudentsFinishing/ImportStudentsFinishing';

interface ImportStudentsProps {
  className?: string;
}

export const ImportStudents = (props: ImportStudentsProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const isLoadingFields = useSelector(getImportStudentsFetchFieldsIsLoading);
    const errorFields = useSelector(getImportStudentsFetchFieldsError);

    const [activeTab, setActiveTab] = useState(1);
    const navigate = useNavigate();
    const [file, setFile] = useState<File>();

    const changeActiveTabHandler = useCallback((value: number) => {
        setActiveTab(value);
    }, []);

    const returnToStudentsPage = useCallback(() => {
        navigate(getRouteStudents());
    }, [navigate]);

    const onSetFileHandler = useCallback((file: File) => {
        setFile(file);
    }, []);

    useEffect(() => {
        dispatch(fetchImportStudentsFields());
    }, [dispatch]);

    const contentMods: Mods = {
        [cls.centered]: activeTab === 1 || activeTab === 3 || activeTab === 4,
    };

    let content;

    if (isLoadingFields) {
        content = (
            <Skeleton height={450} />
        );
    } else if (errorFields) {
        content = (
            <Text
                theme={TextTheme.ERROR}
                size={TextSize.M}
                weight={TextWeight.SEMIBOLD}
                className={cls.error}
            >
                Произошла ошибка при загрузке данных, попробуйте перезагрузить страницу
            </Text>
        );
    } else {
        content = (
            <div className={classNames(cls.content, contentMods, [])}>
                {activeTab === 1 && (
                    <ImportStudentsFileSelection
                        setFile={onSetFileHandler}
                        changeActiveTab={changeActiveTabHandler}
                    />
                )}

                {activeTab === 2 && (
                    <ImportStudentsSelectFields
                        file={file!}
                        changeActiveTab={changeActiveTabHandler}
                    />
                )}

                {activeTab === 3 && (
                    <ImportStudentsProcessing
                        changeActiveTab={changeActiveTabHandler}
                    />
                )}

                {activeTab === 4 && (
                    <ImportStudentsFinishing />
                )}

                {(activeTab === 1 || activeTab === 2) && (
                    <CButton
                        color="danger"
                        className={cls.backBtn}
                        onClick={returnToStudentsPage}
                    >
                        Отмена
                    </CButton>
                )}
            </div>
        );
    }

    return (
        <div className={classNames(cls.ImportStudents, {}, [className])}>
            <ImportStudentsNav
                active={activeTab}
            />

            {content}
        </div>
    );
};
