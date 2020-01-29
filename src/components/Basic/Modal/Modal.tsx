import { modalWithContext } from 'buildo-react-components/lib/Modal';
import { intlShape } from 'react-intl';

import './modal.scss';

const Modal = modalWithContext({
  intl: intlShape
});

export default Modal;
