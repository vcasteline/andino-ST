import React, { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import TableAdd from './images/table_add.svg';
import TableRemove from './images/table_remove.svg';
import css from './FieldTable.module.css';
import { FormattedMessage } from 'react-intl';

const FieldTable = (props) => {
    const { fields, value } = props;

    const [showOverlay, setShowOverlay] = useState(false);
    const [hoverRows, setHoverRows] = useState(0);
    const [hoverCols, setHoverCols] = useState(0);
    const [buttonPosition, setButtonPosition] = useState({ top: 30, left: 0 });

    const handleDocumentClick = (event) => {
        if (!event.target.closest('.overlay')) {
            setShowOverlay(false);
        }
    };

    useEffect(() => {
        if (showOverlay) {
            document.addEventListener('click', handleDocumentClick);
        } else {
            document.removeEventListener('click', handleDocumentClick);
        }

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [showOverlay]);



    const handleAddTableClick = (event) => {
        event.preventDefault(); // Prevent form submission
        const rect = event.target.getBoundingClientRect();
        setShowOverlay(true);
    };

    const handleRemoveTableClick = (event) => {
        event.preventDefault(); // Prevent form submission
        fields.remove(fields.length - 1);
    };

    const handleMouseOver = (row, col) => {
        setHoverRows(row + 1);
        setHoverCols(col + 1);
    };

    const handleOverlayClick = () => {
        setShowOverlay(false);
        generateTable(hoverRows, hoverCols);
    };

    const generateTable = (rows, cols) => {
        const initialData = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => '')
        );
        fields.push({ rows, cols, data: initialData });
    };

    return (
        <div style={{ position: 'relative' }}>
            <div className={css.buttonsContainer}>
                <div className={css.button} onClick={handleAddTableClick}>
                    <img src={TableAdd} className={css.icon} />
                    <p>
                        <FormattedMessage id="FieldTable.addTable" />
                    </p>
                </div>

                {fields.length > 0 &&
                    <div className={css.button} onClick={handleRemoveTableClick}>
                        <img src={TableRemove} className={css.icon} />
                        <p>
                            <FormattedMessage id="FieldTable.removeTable" />
                        </p>
                    </div>
                }
            </div>

            {showOverlay && (
                <div
                    className="overlay"
                    style={{
                        position: 'absolute',
                        top: buttonPosition.top,
                        left: buttonPosition.left,
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid #ccc',
                        padding: '10px',
                        zIndex: 1000,
                    }}
                    onClick={handleOverlayClick}
                >
                    <div
                        className="grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 20px)',
                            gridTemplateRows: 'repeat(7, 20px)',
                            gap: '2px',
                        }}
                    >
                        {Array.from({ length: 7 }).map((_, row) => (
                            <React.Fragment key={row}>
                                {Array.from({ length: 7 }).map((_, col) => (
                                    <div
                                        key={col}
                                        className="grid-cell"
                                        onMouseOver={() => handleMouseOver(row, col)}
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            border: '1px solid black',
                                            cursor: 'pointer',
                                            backgroundColor:
                                                row < hoverRows && col < hoverCols ? 'lightblue' : 'transparent',
                                        }}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}

            {fields.value && fields.value.map((table, tableIndex) => (
                <div key={tableIndex} className="table" style={{ marginTop: '20px' }}>
                    {table.data.map((row, rowIndex) => (
                        <div key={rowIndex} className="table-row" style={{ display: 'flex' }}>
                            {row.map((_, colIndex) => (
                                <Field
                                    key={colIndex}
                                    name={`${fields.name}[${tableIndex}].data[${rowIndex}][${colIndex}]`}
                                    component="input"
                                    type="text"
                                    style={{ width: '100px', height: '30px', marginRight: '5px', marginBottom: '5px' }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FieldTable;
