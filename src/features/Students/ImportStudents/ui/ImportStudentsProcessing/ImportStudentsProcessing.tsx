import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize, TextWeight } from 'shared/ui/Text/Text';
import React, { useEffect } from 'react';
import { CSpinner } from '@coreui/react';
import { useSelector } from 'react-redux';
import {
    getImportStudentsIsLoading,
} from 'features/Students/ImportStudents/model/selectors/getImportStudentsIsLoading/getImportStudentsIsLoading';
import cls from './ImportStudentsProcessing.module.scss';

interface ImportStudentsProcessingProps {
    className?: string;
    changeActiveTab: (value: number) => void;
}
export const ImportStudentsProcessing = (props: ImportStudentsProcessingProps) => {
    const {
        className,
        changeActiveTab,
    } = props;

    const isLoadingImport = useSelector(getImportStudentsIsLoading);

    useEffect(() => {
        if (!isLoadingImport) {
            changeActiveTab(4);
        }
    }, [changeActiveTab, isLoadingImport]);

    return (
        <div className={classNames(cls.ImportStudentsProcessing, {}, [className])}>
            <Text
                size={TextSize.XL}
                weight={TextWeight.SEMIBOLD}
            >
                Данные из файла импортируются в систему…
            </Text>
            <CSpinner
                color="primary"
                className={cls.spinner}
            />
        </div>
    );
};
