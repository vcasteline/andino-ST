import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FormattedMessage, intlShape, injectIntl } from '../../../util/reactIntl';
import { propTypes } from '../../../util/types';
import { Modal } from '../../../components';
import { types as sdkTypes } from '../../../util/sdkLoader';
const { Money } = sdkTypes;


import css from './OfferModal.module.css';
import OfferForm from './OfferForm';
import { formatMoney } from '../../../util/currency';

const OfferModal = props => {
  const {
    className,
    rootClassName,
    intl,
    isOpen,
    onCloseModal,
    onSubmitOffer,
    onManageDisableScrolling,
    transitionInProgress,
    transitionError,
    offerPrice,
    marketplaceCurrency,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const closeButtonMessage = intl.formatMessage({ id: 'OfferModal.later' });

  const formattedPrice = offerPrice ? formatMoney(intl, offerPrice) : null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
      onManageDisableScrolling={onManageDisableScrolling}
      large={true}
    >
      <div  >

        <h3 className={css.modalTitle}>
          <FormattedMessage id={"OfferModal.title"} />
        </h3>

        <p className={css.modalMessage}>
          <FormattedMessage id={"OfferModal.info"} values={{ price: formattedPrice }} />
        </p>

        <OfferForm
          onSubmit={onSubmitOffer}
          transitionInProgress={transitionInProgress}
          transitionError={transitionError}
          marketplaceCurrency={marketplaceCurrency}
        />

      </div>
    </Modal>
  );
};

const { bool, string } = PropTypes;

OfferModal.defaultProps = {
  className: null,
  rootClassName: null,
  transitionInProgress: false,
  transitionError: null,
};

OfferModal.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  transitionInProgress: bool,
  transitionError: propTypes.error,
  marketplaceName: string.isRequired,
};

export default injectIntl(OfferModal);
