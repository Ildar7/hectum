import { classNames } from 'shared/lib/classNames/classNames';
import { CButton, CFormSelect } from '@coreui/react';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { cilArrowRight } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { importStudentsActions } from 'features/Students/ImportStudents';
import { importStudents } from 'features/Students/ImportStudents/model/services/importStudents/importStudents';
import cls from './ImportStudentsSelectFields.module.scss';
import {
    getImportStudentsColumnsFromFile,
} from '../../model/selectors/getImportStudentsColumnsFromFile/getImportStudentsColumnsFromFile';
import {
    getImportStudentsDatabaseFields,
} from '../../model/selectors/getImportStudentsDatabaseFields/getImportStudentsDatabaseFields';
import {
    getImportStudentsMatchingFields,
} from '../../model/selectors/getImportStudentsMatchingFields/getImportStudentsMatchingFields';
import { ImportStudentsSendData } from '../../model/types/importStudents';

interface ImportStudentsSelectFieldsProps {
  className?: string;
  file: File;
  changeActiveTab: (value: number) => void;
}

interface ImportStudentsColumns {
    [key: string]: string;
}
export const ImportStudentsSelectFields = (props: ImportStudentsSelectFieldsProps) => {
    const {
        className,
        file,
        changeActiveTab,
    } = props;
    const dispatch = useAppDispatch();

    const columnsFromFile = useSelector(getImportStudentsColumnsFromFile);
    const databaseFields = useSelector(getImportStudentsDatabaseFields);
    const matchingFields = useSelector(getImportStudentsMatchingFields);

    const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>, databaseField: string, columnName: string) => {
        if (columnName === 'databaseField') {
            Object.entries(databaseFields!).forEach(([fieldKey, fieldValue]) => {
                if (fieldValue === event.target.value) {
                    dispatch(importStudentsActions.setMatchingFields([databaseField, columnName, event.target.value, fieldKey]));
                }
            });
        } else {
            dispatch(importStudentsActions.setMatchingFields([databaseField, columnName, event.target.value]));
        }
    };

    const onImportHandler = useCallback(() => {
        const dataToSend: ImportStudentsSendData = {
            columns: '',
            file,
        };

        const columnsObject: ImportStudentsColumns = {};

        Object.values(matchingFields!).forEach((value) => {
            columnsObject[value.databaseField] = value.customCsvField;
        });

        Object.keys(columnsObject).forEach((objValue) => {
            if (objValue === 'null') {
                delete columnsObject[objValue];
            }
        });

        dataToSend.columns = encodeURIComponent(JSON.stringify(columnsObject));

        dispatch(importStudents(dataToSend));
        changeActiveTab(3);
    }, [changeActiveTab, dispatch, file, matchingFields]);

    useEffect(() => {
        if (databaseFields) {
            dispatch(importStudentsActions.initMatchingFields(Object.keys(databaseFields)));
        }
    }, [databaseFields, dispatch]);

    return (
        <div className={classNames(cls.ImportStudentsSelectFields, {}, [className])}>
            <div className={cls.content}>
                <div className={cls.left}>
                    <h6 className={cls.filterTitle}>Столбцы из CSV файла</h6>
                    {
                        Object.keys(databaseFields!).map((key) => (
                            <CFormSelect
                                className={cls.selectField}
                                key={key}
                                value={matchingFields?.[key] ? matchingFields[key].customCsvField : 'null'}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, key, 'customCsvField');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    columnsFromFile?.map((column) => (
                                        <option
                                            key={column}
                                            value={column}
                                        >
                                            {
                                                column.length > 80
                                                    ? `${column.slice(0, 80)}...`
                                                    : column
                                            }
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        ))
                    }
                </div>
                <div className={cls.middle}>
                    <div className={cls.emptyTitle} />
                    {
                        Object.keys(databaseFields!).map((key) => (
                            <div
                                className={cls.iconBlock}
                                key={key}
                            >
                                <CIcon
                                    icon={cilArrowRight}
                                    className={cls.arrowIcon}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className={cls.right}>
                    <h6 className={cls.filterTitle}>Типы данных в системе</h6>
                    {
                        Object.keys(databaseFields!).map((key) => (
                            <CFormSelect
                                className={cls.selectField}
                                key={key}
                                value={matchingFields?.[key] ? matchingFields[key].databaseFieldValue : 'null'}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        onChangeSelect(event, key, 'databaseField');
                                    }
                                }
                            >
                                <option value="null">Не выбрано</option>
                                {
                                    Object.values(databaseFields!).map((column) => (
                                        <option
                                            key={column}
                                            value={column}
                                        >
                                            {column}
                                        </option>
                                    ))
                                }
                            </CFormSelect>
                        ))
                    }
                </div>
            </div>
            <CButton
                color="primary"
                size="lg"
                className={cls.importBtn}
                onClick={onImportHandler}
            >
                Импортировать
            </CButton>
        </div>
    );
};
