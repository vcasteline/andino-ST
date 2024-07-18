import {
  TX_TRANSITION_ACTOR_CUSTOMER as CUSTOMER,
  TX_TRANSITION_ACTOR_PROVIDER as PROVIDER,
  CONDITIONAL_RESOLVER_WILDCARD,
  ConditionalResolver,
} from '../../transactions/transaction';

/**
 * Get state data against product process for TransactionPage's UI.
 * I.e. info about showing action buttons, current state etc.
 *
 * @param {*} txInfo detials about transaction
 * @param {*} processInfo  details about process
 */
export const getStateDataForPurchaseProcess = (txInfo, processInfo) => {
  const { transaction, transactionRole, nextTransitions } = txInfo;
  const isProviderBanned = transaction?.provider?.attributes?.banned;
  const isShippable = transaction?.attributes?.protectedData?.deliveryMethod === 'shipping';
  const _ = CONDITIONAL_RESOLVER_WILDCARD;

  const {
    processName,
    processState,
    states,
    transitions,
    isCustomer,
    actionButtonProps,
    leaveReviewProps,
    sendCounterOfferProps,
    sendOfferProps,
    payAfterOfferProps,
  } = processInfo;

  return new ConditionalResolver([processState, transactionRole])
    .cond([states.INQUIRY, CUSTOMER], () => {
      const transitionNames = Array.isArray(nextTransitions)
        ? nextTransitions.map(t => t.attributes.name)
        : [];
      const requestAfterInquiry = transitions.REQUEST_PAYMENT_AFTER_INQUIRY;
      const hasCorrectNextTransition = transitionNames.includes(requestAfterInquiry);
      const showOrderPanel = !isProviderBanned && hasCorrectNextTransition;
      return { processName, processState, showOrderPanel };
    })
    .cond([states.INQUIRY, PROVIDER], () => {
      return { processName, processState, showDetailCardHeadings: true };
    })

    // negotiation state

    // NOT USED, pleaca din initial
    .cond([states.INQUIRY, CUSTOMER], () => {
      // Assuming the INQUIRY state is where a customer can start by making an offer
      // and there are no existing offers made yet.
      return {
        processName,
        processState,
        showActionButtons: true,
        primaryButtonProps: actionButtonProps(transitions.MAKE_OFFER, CUSTOMER, {
          label: "Make Offer",
        }),
        // Additional configuration as necessary
      };
    })



    .cond([states.CUSTOMER_MADE_OFFER, CUSTOMER], () => {
      // When the customer has made an offer and is waiting for the provider's response
      return {
        processName,
        processState,
        showDetailCardHeadings: true,
        // Assuming there's a UI element to indicate that an offer is pending
        showPendingOfferInfo: true,
        // Example: "Your offer has been sent to the provider. Waiting for their response."
      };
    })
    .cond([states.PROVIDER_MADE_OFFER, CUSTOMER], () => {
      // When the provider has made a counteroffer to the customer
      return {
        processName,
        processState,
        showDetailCardHeadings: true,
        showActionButtons: true,
        showPendingOfferInfo: true,
        // Customize button props as needed for your UI
        primaryButtonProps: actionButtonProps(transitions.CUSTOMER_ACCEPT, CUSTOMER, {
          label: "Accept Offer",
        }),
        secondaryButtonProps: actionButtonProps(transitions.CUSTOMER_DECLINE, CUSTOMER, {
          label: "Decline Offer",
        }),
        thirdButtonProps: sendOfferProps,
        // Additional button for countering the offer, if applicable
      };
    })
    .cond([states.PROVIDER_MADE_OFFER, PROVIDER], () => {
      // When the provider has made a counteroffer to the customer
      return {
        processName,
        processState,
        showDetailCardHeadings: true,
        showActionButtons: true,
        showPendingOfferInfo: true,
      };
    })

    .cond([states.CUSTOMER_MADE_OFFER, PROVIDER], () => {
      // When viewing the offer as the provider
      return {
        processName,
        processState,
        showDetailCardHeadings: true,
        showActionButtons: true,
        showPendingOfferInfo: true,
        primaryButtonProps: actionButtonProps(transitions.PROVIDER_ACCEPT, PROVIDER, {
          label: "Accept Offer",
        }),
        secondaryButtonProps: actionButtonProps(transitions.PROVIDER_DECLINE, PROVIDER, {
          label: "Decline Offer",
        }),
        thirdButtonProps: sendCounterOfferProps,
      };
    })

    .cond([states.OFFER_ACCEPTED, CUSTOMER], () => {
      return {
        processName,
        processState,
        showDetailCardHeadings: true,
        showActionButtons: true,
        showAcceptedOfferInfo: true,

        // Customize button props as needed for your UI
        primaryButtonProps: payAfterOfferProps
      };
    })
    .cond([states.OFFER_ACCEPTED, PROVIDER], () => {
      return {
        processName,
        processState,
        showDetailCardHeadings: true,
        showAcceptedOfferInfo: true,
      };
    })

    // end of negotiation state
    .cond([states.PURCHASED, CUSTOMER], () => {
      return {
        processName,
        processState,
        showDetailCardHeadings: true,
        showActionButtons: true,
        showExtraInfo: true,
        showAcceptedOfferInfo: true,
        primaryButtonProps: actionButtonProps(transitions.MARK_RECEIVED_FROM_PURCHASED, CUSTOMER),
      };
    })
    .cond([states.PURCHASED, PROVIDER], () => {
      const actionButtonTranslationId = isShippable
        ? `TransactionPage.${processName}.${PROVIDER}.transition-mark-delivered.actionButtonShipped`
        : `TransactionPage.${processName}.${PROVIDER}.transition-mark-delivered.actionButton`;

      return {
        processName,
        processState,
        showDetailCardHeadings: true,
        showActionButtons: true,
        showAcceptedOfferInfo: true,
        primaryButtonProps: actionButtonProps(transitions.MARK_DELIVERED, PROVIDER, {
          actionButtonTranslationId,
        }),
      };
    })
    .cond([states.DELIVERED, CUSTOMER], () => {
      return {
        processName,
        processState,
        showDetailCardHeadings: true,
        showDispute: true,
        showActionButtons: true,
        showAcceptedOfferInfo: true,
        primaryButtonProps: actionButtonProps(transitions.MARK_RECEIVED, CUSTOMER),
      };
    })
    .cond([states.COMPLETED, _], () => {
      return {
        processName,
        processState,
        showDetailCardHeadings: true,
        showReviewAsFirstLink: true,
        showActionButtons: true,
        showAcceptedOfferInfo: true,
        primaryButtonProps: leaveReviewProps,
      };
    })
    .cond([states.REVIEWED_BY_PROVIDER, CUSTOMER], () => {
      return {
        processName,
        processState,
        showDetailCardHeadings: true,
        showReviewAsSecondLink: true,
        showActionButtons: true,
        showAcceptedOfferInfo: true,
        primaryButtonProps: leaveReviewProps,
      };
    })
    .cond([states.REVIEWED_BY_CUSTOMER, PROVIDER], () => {
      return {
        processName,
        processState,
        showDetailCardHeadings: true,
        showReviewAsSecondLink: true,
        showActionButtons: true,
        showAcceptedOfferInfo: true,
        primaryButtonProps: leaveReviewProps,
      };
    })
    .cond([states.REVIEWED, _], () => {
      return { processName, processState, showDetailCardHeadings: true, showReviews: true, showAcceptedOfferInfo: true, };
    })
    .default(() => {
      // Default values for other states
      return { processName, processState, showDetailCardHeadings: true };
    })
    .resolve();
};
