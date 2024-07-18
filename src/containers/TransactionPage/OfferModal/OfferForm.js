import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';

import { FormattedMessage, injectIntl, intlShape } from '../../../util/reactIntl';
import { isTransactionsTransitionAlreadyReviewed } from '../../../util/errors';
import { propTypes } from '../../../util/types';
import { required } from '../../../util/validators';

import { FieldReviewRating, Form, PrimaryButton, FieldTextInput, FieldCurrencyInput } from '../../../components';

import css from './OfferForm.module.css';
import appSettings from '../../../config/settings';

const OfferFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        rootClassName,
        disabled,
        handleSubmit,
        intl,
        formId,
        invalid,
        transitionError,
        transitionInProgress,
        marketplaceCurrency
      } = fieldRenderProps;


      const errorMessage =
        <p className={css.error}>
          <FormattedMessage id="OfferForm.error" />
        </p>

      const errorArea = transitionError ? errorMessage : <p className={css.errorPlaceholder} />;

      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = transitionInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>

          <FieldCurrencyInput
            className={css.reviewContent}
            type="number"
            currencyConfig={appSettings.getCurrencyFormatting(marketplaceCurrency)}
            id={formId ? `${formId}.offerPrice` : 'offerPrice'}
            name="offerPrice"
            label={intl.formatMessage({ id: 'OfferForm.offerPrice' })}
            placeholder={intl.formatMessage({ id: 'OfferForm.offerPricePlaceholder' })}
            validate={required(intl.formatMessage({
              id: 'OfferForm.offerPriceRequired',
            }))}
          />

          {errorArea}
          <PrimaryButton
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
          >
            <FormattedMessage id='OfferForm.submit' />
          </PrimaryButton>
        </Form>
      );
    }}
  />
);

OfferFormComponent.defaultProps = { className: null, rootClassName: null, sendReviewError: null };

const { bool, func, string } = PropTypes;

OfferFormComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  transitionError: propTypes.error,
  transitionInProgress: bool.isRequired,
};

const OfferForm = compose(injectIntl)(OfferFormComponent);
OfferForm.displayName = 'OfferForm';

export default OfferForm;
