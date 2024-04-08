import React, { useEffect } from 'react';
import { string } from 'prop-types';
import css from './QuantityPriceBreaks.module.css';

const QuantityPriceBreaks = ({ quantityPriceBreaks }) => {
    if (!quantityPriceBreaks) return null;

    const priceBreaks = quantityPriceBreaks.split(',').map(breakItem => {
      const [range, price] = breakItem.trim().split(':');
      const [minStr, maxStr] = range.split('-');

      if (minStr.startsWith('>=')|| minStr.startsWith('＞=')) {
        const min = parseInt(minStr.slice(2), 10);
        console.log("min en el if", min)
        return { min, max: null, price: parseFloat(price) };
       
      } else {
        const min = parseInt(minStr, 10);
        const max = maxStr ? parseInt(maxStr, 10) : null;
        return { min, max, price: parseFloat(price) };
      }

    });
  
    return (
      <div className={css.quantityPriceBreaks}>
        {priceBreaks.map(({ min, max, price }, index) => (
          <div key={index} className={css.priceBreak}>
            <span className={css.range}>
              {max ? (
                <>
                  {min} - {max} items
                </>
              ) : (
                <>&ge; {min} items</>
              )}
            </span>
            <span className={css.price}>${(price / 100).toFixed(2)}</span>
          </div>
        ))}
      </div>
    );
  };

QuantityPriceBreaks.propTypes = {
  quantityPriceBreaks: string,
};

export default QuantityPriceBreaks;
