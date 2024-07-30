import React from 'react';
import { arrayOf, string } from 'prop-types';
import { propTypes } from '../../util/types';
import { Modal } from '../../components';
import css from './ModalCertificationsSliderModal.module.css';
import CertificationsSlider from './CertificationsSlider';


const ModalCertificationsSliderModal = props => {
  const {
    certifications,
    onManageDisableScrolling,
    isOpen,
    onClose,
  } = props;

  return (
    <Modal
      id="ShowCertifications"
      isOpen={isOpen}
      onClose={onClose}
      usePortal={false}
      containerClassName={css.modalContainer}
      onManageDisableScrolling={onManageDisableScrolling}
      useLargeSize={false}
    >

      <CertificationsSlider
        certifications={certifications}
        onManageDisableScrolling={onManageDisableScrolling} />

    </Modal >
  );
}




ModalCertificationsSliderModal.defaultProps = {
  className: null,
  rootClassName: null,
  currentUser: null,
};

ModalCertificationsSliderModal.propTypes = {
  id: string.isRequired,
  className: string,
  rootClassName: string,
  containerClassName: string,

  // from useRouteConfiguration
  routeConfiguration: arrayOf(propTypes.route).isRequired,
};

export default ModalCertificationsSliderModal;
