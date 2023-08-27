import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { Text, TextSize, TextWeight } from 'shared/ui/Text/Text';
import React, { useCallback } from 'react';
import { CButton } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { getRouteImportStudents, getRouteStudents } from 'shared/const/router';
import { declareWordForNum } from 'shared/lib/declareWordForNum/declareWordForNum';
import {
    getImportStudentsError,
} from '../../model/selectors/getImportStudentsError/getImportStudentsError';
import cls from './ImportStudentsFinishing.module.scss';
import {
    getImportStudentsData,
} from '../../model/selectors/getImportStudentsData/getImportStudentsData';

interface ImportStudentsFinishingProps {
    className?: string;
}
export const ImportStudentsFinishing = (props: ImportStudentsFinishingProps) => {
    const {
        className,
    } = props;
    const navigate = useNavigate();
    const importData = useSelector(getImportStudentsData);
    const errorImport = useSelector(getImportStudentsError);

    const goToStudentsPage = useCallback(() => {
        navigate(getRouteStudents());
    }, [navigate]);

    const goToFirstStep = useCallback(() => {
        window.location.replace(getRouteImportStudents());
    }, []);

    let content;

    if (errorImport) {
        content = (
            <>
                <Text
                    size={TextSize.XL}
                    weight={TextWeight.SEMIBOLD}
                >
                    Во время импорта данных возникла ошибка:
                </Text>
                <Text
                    size={TextSize.XL}
                    weight={TextWeight.REGULAR}
                    className={cls.errorText}
                >
                    {errorImport}
                </Text>
                <div className={cls.buttons}>
                    <CButton
                        onClick={goToFirstStep}
                        size="lg"
                    >
                        Попробовать снова
                    </CButton>
                    <CButton
                        onClick={goToStudentsPage}
                        className={cls.button}
                        size="lg"
                    >
                        Вернуться на таблицу студентов
                    </CButton>
                </div>
            </>
        );
    } else {
        content = (
            <>
                <Text
                    size={TextSize.XL}
                    weight={TextWeight.SEMIBOLD}
                >
                    Успешно добавлено
                    {' '}
                    {importData!.count}
                    {' '}
                    студентов
                </Text>
                <CButton
                    color="primary"
                    size="lg"
                    onClick={goToStudentsPage}
                    className={cls.button}
                >
                    Открыть таблицу студентов
                </CButton>
            </>
        );
    }

    return (
        <div className={classNames(cls.ImportStudentsFinishing, {}, [className])}>
            {content}
        </div>
    );
};
