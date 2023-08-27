import { CFormInput, CInputGroup, CInputGroupText } from '@coreui/react';
import { cilSearch, cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React, { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { StudentsError } from 'entities/Students';
import { EnrollmentTypesError } from 'entities/EnrollmentTypes';
import cls from './Search.module.scss';

interface SearchProps {
    value?: string;
    onChange?: (value: string) => void;
    searchText: string;
    error?: StudentsError | EnrollmentTypesError;
    isLoading?: boolean;
}
export const Search = memo((props: SearchProps) => {
    const {
        value,
        onChange,
        searchText,
        error,
        isLoading,
    } = props;
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const onClearHandler = () => {
        onChange?.('');
    };

    let search;

    if (error) {
        search = (
            <div />
        );
    } else {
        search = (
            <div className="search">
                <CInputGroup className={classNames(cls.searchInputGroup, {}, ['flex-nowrap'])}>
                    <CInputGroupText id="addon-wrapping">
                        <CIcon icon={cilSearch} />
                    </CInputGroupText>
                    <CFormInput
                        placeholder={searchText}
                        aria-label={searchText}
                        aria-describedby="addon-wrapping"
                        value={value}
                        onChange={onChangeHandler}
                        disabled={isLoading}
                    />
                    {value && (
                        <button type="button" className={cls.searchCloseBtn} onClick={onClearHandler}>
                            <CIcon icon={cilX} className="close-icon" />
                        </button>
                    )}
                </CInputGroup>
            </div>
        );
    }

    return search;
});
