import { IMaskMixin } from 'react-imask';
import { CFormInput } from '@coreui/react';

export const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
    <CFormInput
        {...props}
        // @ts-ignore
        ref={inputRef}
    />
));
