import { bool, func, oneOf, shape, string } from 'prop-types';
import {
  BOOKING_PROCESS_NAME,
  INQUIRY_PROCESS_NAME,
  PURCHASE_PROCESS_NAME,
  resolveLatestProcessName,
} from '../../transactions/transaction';
import { getStateDataForBookingProcess } from './TransactionPage.stateDataBooking.js';
import { getStateDataForInquiryProcess } from './TransactionPage.stateDataInquiry.js';
import { getStateDataForPurchaseProcess } from './TransactionPage.stateDataPurchase.js';

const errorShape = shape({
  type: oneOf(['error']).isRequired,
  name: string.isRequired,
  message: string,
});

const actionButtonsShape = shape({
  inProgress: bool,
  error: errorShape,
  onAction: func.isRequired,
  buttonText: string,
  errorText: string,
});

export const stateDataShape = shape({
  processName: string.isRequired,
  processState: string.isRequired,
  primaryButtonProps: actionButtonsShape,
  secondaryButtonProps: actionButtonsShape,
  showActionButtons: bool,
  showDetailCardHeadings: bool,
  showDispute: bool,
  showOrderPanel: bool,
  showReviewAsFirstLink: bool,
  showReviewAsSecondLink: bool,
  showReviews: bool,
});

// Transitions are following process.edn format: "transition/my-transtion-name"
// This extracts the 'my-transtion-name' string if namespace exists
const getTransitionKey = transitionName => {
  const [nameSpace, transitionKey] = transitionName.split('/');
  return transitionKey || transitionName;
};

// Action button prop for the TransactionPanel
const getActionButtonPropsMaybe = (params, onlyForRole = 'both') => {
  const {
    processName,
    transitionName,
    inProgress,
    transitionError,
    onAction,
    transactionRole,
    actionButtonTranslationId,
    actionButtonTranslationErrorId,
    intl,
  } = params;
  const transitionKey = getTransitionKey(transitionName);

  const actionButtonTrId =
    actionButtonTranslationId ||
    `TransactionPage.${processName}.${transactionRole}.transition-${transitionKey}.actionButton`;
  const actionButtonTrErrorId =
    actionButtonTranslationErrorId ||
    `TransactionPage.${processName}.${transactionRole}.transition-${transitionKey}.actionError`;

  return onlyForRole === 'both' || onlyForRole === transactionRole
    ? {
        inProgress,
        error: transitionError,
        onAction,
        buttonText: intl.formatMessage({ id: actionButtonTrId }),
        errorText: intl.formatMessage({ id: actionButtonTrErrorId }),
      }
    : {};
};

export const getStateData = (params, process) => {
  const {
    transaction,
    transactionRole,
    intl,
    transitionInProgress,
    transitionError,
    onTransition,
    sendReviewInProgress,
    sendReviewError,
    onOpenReviewModal,
    onOpenSendOfferModal,
    onOpenSendCounterOfferModal,
    onGoToCheckout,
  } = params;
  const isCustomer = transactionRole === 'customer';
  const processName = resolveLatestProcessName(transaction?.attributes?.processName);

  const getActionButtonProps = (transitionName, forRole, extra = {}) =>
    getActionButtonPropsMaybe(
      {
        processName,
        transitionName,
        transactionRole,
        intl,
        inProgress: transitionInProgress === transitionName,
        transitionError,
        onAction: () => onTransition(transaction?.id, transitionName, {}),
        ...extra,
      },
      forRole
    );

  const getLeaveReviewProps = getActionButtonPropsMaybe({
    processName,
    transitionName: 'leaveReview',
    transactionRole,
    intl,
    inProgress: sendReviewInProgress,
    transitionError: sendReviewError,
    onAction: onOpenReviewModal,
    actionButtonTranslationId: 'TransactionPage.leaveReview.actionButton',
    actionButtonTranslationErrorId: 'TransactionPage.leaveReview.actionError',
  });

 const getSendOfferProps = getActionButtonPropsMaybe({
    processName,
    transitionName: 'customer-offer',
    transactionRole,
    intl,
    inProgress: transitionInProgress,
    transitionError: transitionError,
    onAction: onOpenSendOfferModal,
    actionButtonTranslationId: 'TransactionPage.offer.actionButton',
    actionButtonTranslationErrorId: 'TransactionPage.offer.actionError',
  });

  const getSendCounterOfferProps = getActionButtonPropsMaybe({
    processName,
    transitionName: 'provider-offer',
    transactionRole,
    intl,
    inProgress: transitionInProgress,
    transitionError: transitionError,
    onAction: onOpenSendCounterOfferModal,
    actionButtonTranslationId: 'TransactionPage.counterOffer.actionButton',
    actionButtonTranslationErrorId: 'TransactionPage.counterOffer.actionError',
  });

  const getPayAfterOfferProps = getActionButtonPropsMaybe({
    processName,
    transitionName: 'transition/request-payment-after-offer',
    transactionRole,
    intl,
    inProgress: transitionInProgress,
    transitionError: transitionError,
    onAction: onGoToCheckout,
    actionButtonTranslationId: 'TransactionPage.pay.actionButton',
    actionButtonTranslationErrorId: 'TransactionPage.pay.actionError',
  });
  const processInfo = () => {
    const { getState, states, transitions } = process;
    const processState = getState(transaction);
    return {
      processName,
      processState,
      states,
      transitions,
      isCustomer,
      actionButtonProps: getActionButtonProps,
      leaveReviewProps: getLeaveReviewProps,
      sendOfferProps: getSendOfferProps,
      sendCounterOfferProps: getSendCounterOfferProps,
      payAfterOfferProps: getPayAfterOfferProps
    };
  };

  if (processName === PURCHASE_PROCESS_NAME) {
    return getStateDataForPurchaseProcess(params, processInfo());
  } else if (processName === BOOKING_PROCESS_NAME) {
    return getStateDataForBookingProcess(params, processInfo());
  } else if (processName === INQUIRY_PROCESS_NAME) {
    return getStateDataForInquiryProcess(params, processInfo());
  } else {
    return {};
  }
};