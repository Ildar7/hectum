import { classNames } from 'shared/lib/classNames/classNames';
import { CNav, CNavItem, CNavLink } from '@coreui/react';
import cls from './ImportStudentsNav.module.scss';

interface ImportStudentsNavProps {
  className?: string;
  active: number;
}
export const ImportStudentsNav = ({ className, active }: ImportStudentsNavProps) => (
    <CNav
        className={classNames(cls.ImportStudentsNav, {}, [className])}
        variant="pills"
        layout="fill"
    >
        <CNavItem>
            <CNavLink
                active={active === 1}
                className={classNames(cls.tabLink, { [cls.activeLink]: active === 1 }, [])}
            >
                Выбор файла
            </CNavLink>
        </CNavItem>
        <CNavItem>
            <CNavLink
                active={active === 2}
                className={classNames(cls.tabLink, { [cls.activeLink]: active === 2 }, [])}
            >
                Параметры импорта
            </CNavLink>
        </CNavItem>
        <CNavItem>
            <CNavLink
                active={active === 3}
                className={classNames(cls.tabLink, { [cls.activeLink]: active === 3 }, [])}
            >
                Импорт данных
            </CNavLink>
        </CNavItem>
        <CNavItem>
            <CNavLink
                active={active === 4}
                className={classNames(cls.tabLink, { [cls.activeLink]: active === 4 }, [])}
            >
                Завершение
            </CNavLink>
        </CNavItem>
    </CNav
    >
);
