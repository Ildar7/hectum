import { classNames } from 'shared/lib/classNames/classNames';
import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import React from 'react';
import cls from './Datepicker.module.scss';

interface DatepickerProps {
  className?: string;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}
export const Datepicker = (props: DatepickerProps) => {
    const {
        className,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
    } = props;

    return (
        <div className={classNames(cls.Datepicker, {}, [className])}>
            <DatePicker
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={(date) => setStartDate(date)}
                maxDate={new Date()}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                locale={ru}
                className={cls.datepickerItem}
                dateFormat="dd.MM.yyyy"
                placeholderText="От"
            />
            <DatePicker
                selected={endDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                onChange={(date) => setEndDate(date)}
                maxDate={new Date()}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                locale={ru}
                className={cls.datepickerItem}
                dateFormat="dd.MM.yyyy"
                placeholderText="До"
            />
        </div>
    );
};
