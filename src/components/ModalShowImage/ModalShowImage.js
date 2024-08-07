import React from 'react';
import { arrayOf, string } from 'prop-types';
import { propTypes } from '../../util/types';
import { Modal } from '../../components';
import css from './ModalShowImage.module.css'


const ModalShowImage = props => {
  const {
    imageUrl,
    onManageDisableScrolling,
    isOpen,
    onClose,
  } = props;

  return (
    <Modal
      id="ShowImage"
      isOpen={isOpen}
      onClose={onClose}
      usePortal={true}
      lightCloseButton={css.lightCloseButton}
      containerClassName={css.modalContainer}
      onManageDisableScrolling={onManageDisableScrolling}
      useLargeSize={true}
    >
      <img className={css.modalImage} src={imageUrl} />
    </Modal >
  );
}

ModalShowImage.defaultProps = {
  className: null,
  rootClassName: null,
  currentUser: null,
};

ModalShowImage.propTypes = {
  id: string.isRequired,
  className: string,
  rootClassName: string,
  containerClassName: string,

  // from useRouteConfiguration
  routeConfiguration: arrayOf(propTypes.route).isRequired,
};

export default ModalShowImage;
