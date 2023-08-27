import { classNames } from 'shared/lib/classNames/classNames';
import { HelmetProvider } from 'app/providers/HelmetProvider';
import cls from './MainPage.module.scss';

interface MainPageProps {
  className?: string;
}
const MainPage = (props: MainPageProps) => {
    const {
        className,
    } = props;
    return (
        <HelmetProvider
            title="Hectum LMS"
        >
            <div className={classNames(cls.MainPage, {}, [])}>
                Главная страница
            </div>
        </HelmetProvider>

    );
};

export default MainPage;
