import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
    DEFAULT = 'default',
    ERROR = 'error'
}

export enum TextSize {
    S = 's',
    M = 'm',
    L = 'l',
    XL = 'xl',
}

export enum TextWeight {
    REGULAR = 'regular',
    MEDIUM = 'medium',
    SEMIBOLD = 'semibold',
    BOLD = 'bold',
    EXTRABOLD = 'extrabold'
}
interface TextProps {
    children?: ReactNode;
    className?: string;
    theme?: TextTheme;
    size?: TextSize;
    weight?: TextWeight;
}
export const Text = (props: TextProps) => {
    const {
        children,
        className,
        theme = TextTheme.DEFAULT,
        weight = TextWeight.REGULAR,
        size = TextSize.S,
    } = props;

    return (
        <div className={classNames(
            cls.Text,
            {},
            [className, cls[theme], cls[size], cls[weight]],
        )}
        >
            {children}
        </div>
    );
};
