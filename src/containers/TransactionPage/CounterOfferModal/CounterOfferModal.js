import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FormattedMessage, intlShape, injectIntl } from '../../../util/reactIntl';
import { propTypes } from '../../../util/types';
import { Modal } from '../../../components';
import { types as sdkTypes } from '../../../util/sdkLoader';
const { Money } = sdkTypes;


import css from './CounterOfferModal.module.css';
import CounterOfferForm from './CounterOfferForm';
import { formatMoney } from '../../../util/currency';

const CounterOfferModal = props => {
  const {
    className,
    rootClassName,
    intl,
    isOpen,
    onCloseModal,
    onSubmitCounterOffer,
    onManageDisableScrolling,
    transitionInProgress,
    transitionError,
    offerPrice,
    marketplaceCurrency,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const closeButtonMessage = intl.formatMessage({ id: 'CounterOfferModal.later' });

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
          <FormattedMessage id={"CounterOfferModal.title"} />
        </h3>

        <p className={css.modalMessage}>
          <FormattedMessage id={"CounterOfferModal.info"} values={{ price: formattedPrice }} />
        </p>

        <CounterOfferForm
          onSubmit={onSubmitCounterOffer}
          transitionInProgress={transitionInProgress}
          transitionError={transitionError}
          marketplaceCurrency={marketplaceCurrency}
        />

      </div>
    </Modal>
  );
};

const { bool, string } = PropTypes;

CounterOfferModal.defaultProps = {
  className: null,
  rootClassName: null,
  transitionInProgress: false,
  transitionError: null,
};

CounterOfferModal.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  transitionInProgress: bool,
  transitionError: propTypes.error,
  marketplaceName: string.isRequired,
};

export default injectIntl(CounterOfferModal);
