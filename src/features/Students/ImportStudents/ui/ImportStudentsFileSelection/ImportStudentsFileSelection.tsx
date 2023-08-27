import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize, TextWeight } from 'shared/ui/Text/Text';
import { CButton, CToaster } from '@coreui/react';
import React, {
    ChangeEvent, ReactElement, useRef, useState,
} from 'react';
import { Toast } from 'shared/ui/Toast/Toast';
import Papa from 'papaparse';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { importStudentsActions } from '../../model/slice/importStudentsSlice';
import cls from './ImportStudentsFileSelection.module.scss';

interface ImportStudentsFileSelectionProps {
    className?: string;
    setFile: (file: File) => void;
    changeActiveTab: (value: number) => void;
}
export const ImportStudentsFileSelection = (props: ImportStudentsFileSelectionProps) => {
    const {
        className,
        setFile,
        changeActiveTab,
    } = props;
    const dispatch = useAppDispatch();
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);

    const handleParseCsvFile = (fileItem: File) => {
        if (fileItem) {
            Papa.parse(fileItem, {
                header: true,
                complete: (result) => {
                    if (result.data.length > 0) {
                        const firstRow = result.data[0];
                        const columnNames = Object.keys(firstRow!);
                        dispatch(importStudentsActions.setColumnsFromFile(columnNames));
                        changeActiveTab(2);
                    }
                },
                error: (error) => {
                    console.error('CSV parsing error:', error);
                    addToast(Toast.error('Произошла ошибка при чтении CSV файла, попробуйте снова'));
                },
            });
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0].name.split('.')[1] !== 'csv' && e.target.files![0].type !== 'text/csv') {
            addToast(Toast.error('Разрешены файлы, имеющие только расширение .csv'));
        } else if (e.target.files) {
            setFile(e.target.files[0]);
            handleParseCsvFile(e.target.files[0]);
        }
    };

    return (
        <div className={classNames(cls.ImportStudentsFileSelection, {}, [className])}>
            <Text
                size={TextSize.XL}
                weight={TextWeight.SEMIBOLD}
            >
                Выберите файл формата CSV для импорта студентов в Hectum LMS
            </Text>
            <CButton
                className={cls.fileInputBtn}
                size="lg"
            >
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="file-upload" className={cls.fileInputLabel}>
                    Выбрать файл
                </label>
            </CButton>
            <input
                className={cls.fileInput}
                id="file-upload"
                type="file"
                accept="text/csv"
                onChange={handleFileChange}
            />

            <CToaster
                ref={toaster}
                push={toast}
                placement="top-center"
            />
        </div>
    );
};
