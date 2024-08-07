import { convertDecimalJSToNumber, getAmountAsDecimalJS, isSafeNumber } from './currency';
import { types as sdkTypes } from './sdkLoader';
const { Money } = sdkTypes;


export const getPriceBreaks = (listing) => {

    const quantityPriceBreaks = listing?.attributes?.publicData.quantityPriceBreaks;
    if (!listing || !quantityPriceBreaks) return null;


    const priceBreaks = quantityPriceBreaks.split(',').map(breakItem => {
        const [range, price] = breakItem.trim().split(':');
        const [minStr, maxStr] = range.split('-');

        if (minStr.startsWith('>=') || minStr.startsWith('＞=')) {
            const min = parseInt(minStr.slice(2), 10);

            return { min, max: null, price: parseFloat(price) };

        } else {
            const min = parseInt(minStr, 10);
            const max = maxStr ? parseInt(maxStr, 10) : null;
            return { min, max, price: parseFloat(price) };
        }

    });

    return priceBreaks
}


export const getPriceBasedOnQuantityPriceBreaks = (quantity, currency, listing) => {
    const quantityPriceBreaks = getPriceBreaks(listing);
    if (!quantityPriceBreaks) return null;

    const quantityInt = parseInt(quantity);

    const priceBreak = quantityPriceBreaks.find(breakItem => {
        if (breakItem.max === null) {
            return quantityInt >= breakItem.min;
        } else {
            return quantityInt >= breakItem.min && quantityInt <= breakItem.max;
        }
    });

    if (priceBreak) {
        return new Money(priceBreak.price * quantityInt, currency);
    } else {
        return new Money(listing.attributes.price.amount * quantityInt, currency);
    }



}

export const getProposedPriceTotal = (quantity, proposedUnitPrice) => {
    return new Money(proposedUnitPrice.amount * quantity, proposedUnitPrice.currency);
}

//taken from lineItemHelpers
export const calculateShippingFee = (
    shippingPriceInSubunitsOneItem,
    shippingPriceInSubunitsAdditionalItems,
    currency,
    quantity
) => {
    if (shippingPriceInSubunitsOneItem && currency && quantity === 1) {
        return new Money(shippingPriceInSubunitsOneItem, currency);
    } else if (
        shippingPriceInSubunitsOneItem &&
        shippingPriceInSubunitsAdditionalItems &&
        currency &&
        quantity > 1
    ) {
        const oneItemFee = getAmountAsDecimalJS(new Money(shippingPriceInSubunitsOneItem, currency));
        const additionalItemsFee = getAmountAsDecimalJS(
            new Money(shippingPriceInSubunitsAdditionalItems, currency)
        );
        const additionalItemsTotal = additionalItemsFee.times(quantity - 1);
        const numericShippingFee = convertDecimalJSToNumber(oneItemFee.plus(additionalItemsTotal));
        return new Money(numericShippingFee, currency);
    }
    return null;
};

export const getOfferPriceTotal = (proposedPriceTotal, shippingCost) => {
    if (!proposedPriceTotal || !shippingCost) return null;

    return new Money(proposedPriceTotal.amount + shippingCost.amount, proposedPriceTotal.currency)
}

export const getObjectFromMoney = (money) => {
    return { amount: money.amount, currency: money.currency }
}

export const getMoneyFromObject = (moneyAsObject) => {
    return new Money(moneyAsObject.amount, moneyAsObject.currency);
}
