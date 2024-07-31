import React, { useState } from "react";
import './FieldWeightDimensions.css'

export const FieldWeightDimensions = ({ data, values }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    console.log(data)

    const handleChange = (e) => {
        const inputValue = e.target.value;

        // Expresión regular para validar números con dos decimales
        const regex = /^\d+(\.\d{0,2})?$/;

        if (regex.test(inputValue) || inputValue === '') {
            setValue(inputValue);
            setError('');
        } else {
            setError('invalid data, can only be numbers.');
        }
    };
    return (
        <>
            <label></label>
            <div className="container">
                <div>
                    <label>Weight</label>
                    <input
                        onChange={handleChange}
                        placeholder={data[6].key + " (lb)"} />
                </div>
                <i class="fas fa-box-open" style={{ fontSize: "7vh" }}></i>
                <div>
                    <label>Dimensions</label>
                    <div className="containerDimensions">
                        <input
                            onChange={handleChange}
                            placeholder={data[5].key + " (in)"} /><span>X</span>
                        <input
                            onChange={handleChange}
                            placeholder={data[3].key + " (in)"} /><span>X</span>
                        <input
                            onChange={handleChange}
                            placeholder={data[3].key + " (in)"} />

                    </div>
                </div>
            </div>
            {error && <span style={{ color: 'red' }}>{error}</span>}
        </>
    )
}