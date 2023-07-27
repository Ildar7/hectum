import { CFormInput, CInputGroup, CInputGroupText } from '@coreui/react';
import { cilSearch, cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React, { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getStudentsError, getStudentsIsLoading } from 'entities/Students';
import cls from './Search.module.scss';

interface SearchProps {
    value?: string;
    onChange?: (value: string) => void;
}
export const Search = memo((props: SearchProps) => {
    const {
        value,
        onChange,
    } = props;
    const isLoading = useSelector(getStudentsIsLoading);
    const error = useSelector(getStudentsError);
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
                        placeholder="Поиск по ФИО"
                        aria-label="Поиск по ФИО"
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
