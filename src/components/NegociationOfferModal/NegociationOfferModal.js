import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage, injectIntl } from 'react-intl';
import { types as sdkTypes } from '../../util/sdkLoader';
const { Money } = sdkTypes;
import css from './NegociationOfferModal.module.css';
import NegociationOfferForm from './NegociationOfferForm';
import Modal from '../Modal/Modal';
import { propTypes } from '../../util/types';
import { intlShape } from '../../util/reactIntl';

const NegociationOfferModal = props => {
  const {
    className,
    rootClassName,
    intl,
    isOpen,
    onCloseModal,
    onSubmitOffer,
    onManageDisableScrolling,
    sendInquiryInProgress,
    sendInquiryError,
    marketplaceCurrency,
    listing
  } = props;

  if (!listing) return;

  return (
    <Modal
      id="NegociationOfferModal"
      isOpen={isOpen}
      onClose={onCloseModal}
      onManageDisableScrolling={onManageDisableScrolling}
      large={true}
    >
      <div  >

        <h3 className={css.modalTitle}>
          <FormattedMessage id={"NegociationOfferModal.title"} />
        </h3>

        <NegociationOfferForm
          onSubmit={onSubmitOffer}
          sendInquiryInProgress={sendInquiryInProgress}
          sendInquiryError={sendInquiryError}
          marketplaceCurrency={marketplaceCurrency}
          listing={listing}
        />

      </div>
    </Modal>
  );
};

const { bool, string } = PropTypes;

NegociationOfferModal.defaultProps = {
  className: null,
  rootClassName: null,
  transitionInProgress: false,
  transitionError: null,
};

NegociationOfferModal.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  transitionInProgress: bool,
  transitionError: propTypes.error,
};

export default injectIntl(NegociationOfferModal);