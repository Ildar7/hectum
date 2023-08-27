import { classNames } from 'shared/lib/classNames/classNames';
import { HelmetProvider } from 'app/providers/HelmetProvider';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => (
    <HelmetProvider
        title="Hectum LMS - Страница не найдена"
    >
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            Страница не найдена
        </div>
    </HelmetProvider>
);
