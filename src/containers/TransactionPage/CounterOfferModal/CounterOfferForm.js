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

import css from './CounterOfferForm.module.css';
import appSettings from '../../../config/settings';

const CounterOfferFormComponent = props => (
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
          <FormattedMessage id="CounterOfferForm.error" />
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
            label={intl.formatMessage({ id: 'CounterOfferForm.counterOfferPrice' })}
            placeholder={intl.formatMessage({ id: 'CounterOfferForm.counterOfferPricePlaceholder' })}
            validate={required(intl.formatMessage({
              id: 'CounterOfferForm.counterOfferPriceRequired',
            }))}
          />

          {errorArea}
          <PrimaryButton
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
          >
            <FormattedMessage id='CounterOfferForm.submit' />
          </PrimaryButton>
        </Form>
      );
    }}
  />
);

CounterOfferFormComponent.defaultProps = { className: null, rootClassName: null, sendReviewError: null };

const { bool, func, string } = PropTypes;

CounterOfferFormComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  transitionError: propTypes.error,
  transitionInProgress: bool.isRequired,
};

const CounterOfferForm = compose(injectIntl)(CounterOfferFormComponent);
CounterOfferForm.displayName = 'CounterOfferForm';

export default CounterOfferForm;
