import { classNames } from 'shared/lib/classNames/classNames';
import { CPagination, CPaginationItem } from '@coreui/react';
import { useSelector } from 'react-redux';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { getStudentsError, getStudentsIsLoading, StudentsType } from 'entities/Students';
import cls from './Pagintaion.module.scss';

interface PagintaionProps {
  className?: string;
  data: StudentsType[];
}
export const Pagintaion = (props: PagintaionProps) => {
    const {
        className,
        data,
    } = props;
    const isLoading = useSelector(getStudentsIsLoading);
    const error = useSelector(getStudentsError);

    let pagination;

    if (isLoading) {
        pagination = (
            <Skeleton width={250} height={40} border="6px" className={cls.skeleton} />
        );
    } else if (error) {
        pagination = (
            <div />
        );
    } else {
        pagination = (
            !data.length ? (
                <div />
            ) : (
                <div className={classNames(cls.Pagintaion, {}, [className])}>
                    <CPagination aria-label="Students pagination" align="end">
                        <CPaginationItem disabled>Предыдующая</CPaginationItem>
                        <CPaginationItem disabled>1</CPaginationItem>
                        <CPaginationItem disabled>2</CPaginationItem>
                        <CPaginationItem disabled>3</CPaginationItem>
                        <CPaginationItem disabled>Следующая</CPaginationItem>
                    </CPagination>
                </div>
            )
        );
    }

    return pagination;
};
