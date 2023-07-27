import { classNames } from 'shared/lib/classNames/classNames';
import cls from './MainPage.module.scss';

interface MainPageProps {
  className?: string;
}
const MainPage = (props: MainPageProps) => {
    const {
        className,
    } = props;
    return (
        <div className={classNames(cls.MainPage, {}, [])}>
            Главная страница
        </div>
    );
};

export default MainPage;
