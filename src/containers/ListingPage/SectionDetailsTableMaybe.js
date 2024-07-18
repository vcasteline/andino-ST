import React from 'react';



import css from './ListingPage.module.css';

const SectionDetailsTableMaybe = props => {
  const { publicData, intl } = props;

  if (!publicData) {
    return null;
  }

  const tableDataArray = publicData.descriptionTable;

  return (
    <section className={css.sectionDetails}>

      <div>
        {tableDataArray?.map((tableData, index) => (
          <table key={index} border="1" style={{ borderCollapse: 'collapse', marginTop: '20px', minWidth: '100px' }}>
            <tbody>
              {tableData?.data?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        padding: '8px',
                        fontWeight: rowIndex === 0 ? 'bold' : 'normal',
                        minWidth: '100px',
                        backgroundColor: rowIndex === 0 ? 'lightGray' : "white",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </section>
  )
};

export default SectionDetailsTableMaybe;
