import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';

interface HelmetProviderProps {
  children: ReactNode;
  title: string;
}
export const HelmetProvider = (props: HelmetProviderProps) => {
    const {
        children,
        title,
    } = props;

    return (
        <>
            <Helmet>
                <title>
                    {title}
                </title>
            </Helmet>
            {children}
        </>
    );
};
