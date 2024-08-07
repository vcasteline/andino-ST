import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import classNames from 'classnames';

import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { numberAtLeast, required } from '../../util/validators';

import { Form, PrimaryButton, FieldTextInput, FieldCurrencyInput } from '../../components';

import css from './NegociationOfferForm.module.css';
import appSettings from '../../config/settings';
import { formatMoney } from '../../util/currency';
import { calculateShippingFee, getOfferPriceTotal, getPriceBasedOnQuantityPriceBreaks, getProposedPriceTotal } from '../../util/priceHelpers';


const NegociationOfferFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        rootClassName,
        disabled,
        handleSubmit,
        intl,
        form,
        formId,
        invalid,
        sendInquiryInProgress,
        sendInquiryError,
        marketplaceCurrency,
        listing,
        values,
      } = fieldRenderProps;

      const { price, publicData } = listing.attributes || {};
      const { quantityPriceBreaks,
        minOrderQuantity = 1,
        shippingEnabled,
        shippingPriceInSubunitsAdditionalItems,
        shippingPriceInSubunitsOneItem } = publicData;


      const errorMessage =
        <p className={css.error}>
          <FormattedMessage id="NegociationOfferForm.error" />
        </p>

      const errorArea = sendInquiryError ? errorMessage : <p className={css.errorPlaceholder} />;

      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = sendInquiryInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const handleOnChange = formValues => {
        const { quantity, proposedPrice } = formValues.values || {};

        if (quantity) {
          const currentPriceTotal = getPriceBasedOnQuantityPriceBreaks(quantity, marketplaceCurrency, listing);

          if (currentPriceTotal && formValues.values.currentPriceTotal?.amount != currentPriceTotal.amount) {
            form.change('currentPriceTotal', currentPriceTotal)
          }
        }

        if (quantity && proposedPrice) {
          const proposedPriceTotal = getProposedPriceTotal(quantity, proposedPrice);

          if (proposedPriceTotal && formValues.values.proposedPriceTotal?.amount != proposedPriceTotal.amount) {
            form.change('proposedPriceTotal', proposedPriceTotal)

            const shippingCost = calculateShippingFee(shippingPriceInSubunitsOneItem, shippingPriceInSubunitsAdditionalItems, marketplaceCurrency, quantity)
            if (shippingCost && formValues.values.shippingCost?.amount != shippingCost.amount) {
              form.change('shippingCost', shippingCost)
            }

            const offerTotal = getOfferPriceTotal(proposedPriceTotal, shippingCost);
            if (offerTotal && formValues.values.offerTotal?.amount != offerTotal.amount) {
              form.change('offerTotal', offerTotal);
            }
          }
        } else {
          form.change('proposedPriceTotal', null);
          form.change('shippingCost', null);
          form.change('offerTotal', null);
        }
      }

      return (
        <Form className={classes} onSubmit={handleSubmit}>

          <p className={css.modalMessage}>
            <FormattedMessage id={"NegociationOfferForm.listingPrice"} values={{ price: formatMoney(intl, price) }} />
          </p>

          <FormSpy subscription={{ values: true }} onChange={handleOnChange} />


          <FieldTextInput
            type="number"
            className={css.input}
            id={formId ? `${formId}.quantity` : 'quantity'}
            name="quantity"
            label={intl.formatMessage({ id: 'NegociationOfferForm.quantity' })}
            placeholder={intl.formatMessage({ id: 'NegociationOfferForm.quantityPlaceholder' })}
            validate={numberAtLeast(intl.formatMessage({
              id: 'NegociationOfferForm.quantityRequired'
            }, { value: minOrderQuantity }), minOrderQuantity)}
          />

          <FieldCurrencyInput
            className={css.input}
            type="number"
            currencyConfig={appSettings.getCurrencyFormatting(marketplaceCurrency)}
            id={formId ? `${formId}.proposedPrice` : 'proposedPrice'}
            name="proposedPrice"
            label={intl.formatMessage({ id: 'NegociationOfferForm.proposedPrice' })}
            placeholder={intl.formatMessage({ id: 'NegociationOfferForm.proposedPricePlaceholder' })}
            validate={required(intl.formatMessage({
              id: 'NegociationOfferForm.proposedPriceRequired',
            }))}
          />

          <p className={css.totalInfo}>
            <FormattedMessage id="NegociationOfferForm.currentPriceTotal" values={{ value: values.currentPriceTotal ? formatMoney(intl, values.currentPriceTotal) : "-" }} />
          </p>


          <p className={css.totalInfo}>
            <FormattedMessage id="NegociationOfferForm.proposedPriceTotal" values={{ value: values.proposedPriceTotal ? formatMoney(intl, values.proposedPriceTotal) : "-" }} />
          </p>

          <p className={css.totalInfo}>
            <FormattedMessage id="NegociationOfferForm.shippingCost" values={{ value: values.shippingCost ? formatMoney(intl, values.shippingCost) : "-" }} />
          </p>

          <p className={css.offerTotal}>
            <FormattedMessage id="NegociationOfferForm.offerTotal" values={{ value: values.offerTotal ? formatMoney(intl, values.offerTotal) : "-" }} />
          </p>

          <p className={css.info}>
            <FormattedMessage id="NegociationOfferForm.info" />
          </p>


          {errorArea}
          <PrimaryButton
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
          >
            <FormattedMessage id='NegociationOfferForm.submitOffer' />
          </PrimaryButton>
        </Form>
      );
    }}
  />
);

NegociationOfferFormComponent.defaultProps = { className: null, rootClassName: null, sendReviewError: null };

const { bool, func, string } = PropTypes;

NegociationOfferFormComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  sendInquiryError: propTypes.error,
  sendInquiryInProgress: bool.isRequired,
};

const NegociationOfferForm = compose(injectIntl)(NegociationOfferFormComponent);
NegociationOfferForm.displayName = 'NegociationOfferForm';

export default NegociationOfferForm;