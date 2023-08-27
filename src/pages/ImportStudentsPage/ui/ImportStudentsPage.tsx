import { classNames } from 'shared/lib/classNames/classNames';
import { HelmetProvider } from 'app/providers/HelmetProvider';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ImportStudents, importStudentsReducer } from 'features/Students/ImportStudents';

interface ImportStudentsPageProps {
  className?: string;
}

const reducers: ReducersList = {
    importStudents: importStudentsReducer,
};
const ImportStudentsPage = (props: ImportStudentsPageProps) => {
    const {
        className,
    } = props;

    return (
        <HelmetProvider
            title="Hectum LMS - Импорт студентов"
        >
            <DynamicModuleLoader reducers={reducers}>
                <ImportStudents className={classNames('', {}, [className])} />
            </DynamicModuleLoader>
        </HelmetProvider>
    );
};

export default ImportStudentsPage;
