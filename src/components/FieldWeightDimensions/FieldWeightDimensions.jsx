import React, { useState } from "react";
import './FieldWeightDimensions.css'

export const FieldWeightDimensions = ({ values }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    console.log(values)

    const handleChange = (e, type) => {
        const inputValue = e.target.value;
        const regex = /^\d+(\.\d{0,2})?$/;

        if (regex.test(inputValue) || inputValue === '') {
            setValue(inputValue);
            setError('');
            if (type === "weight") {
                values.pub_weight = inputValue;
            } else if (type === "length") {
                values.pub_length = inputValue;
            } else if (type === "width") {
                values.pub_width = inputValue;
            } else if (type === "height") {
                values.pub_height = inputValue;
            }
        } else {
            setError('invalid data, can only be numbers.');
        }
        // console.log(values)
    };


    return (
        <>
            <div style={{ marginBottom: "3vh" }}>
                <div className="containerWi">
                    <div>
                        <label>Weight</label>
                        <input
                            onChange={(e) => handleChange(e, "weight")}
                            placeholder={"Weight (lb)"}
                            value={values.pub_weight} />
                    </div>
                    <i class="fas fa-box-open" style={{ fontSize: "7vh" }}></i>
                    <div>
                        <label>Dimensions</label>
                        <div className="containerDimensions">
                            <input
                                onChange={(e) => handleChange(e, "length")}
                                placeholder={"Length (in)"}
                                value={values.pub_length} /><span>X</span>
                            <input
                                onChange={(e) => handleChange(e, "width")}
                                placeholder={"Width (in)"}
                                value={values.pub_width} /><span>X</span>
                            <input
                                onChange={(e) => handleChange(e, "height")}
                                placeholder={"Height (in)"}
                                value={values.pub_height !== null ? values.pub_height : ""} />

                        </div>
                    </div>
                </div>
                {error && <span style={{ color: 'red' }}>{error}</span>}
            </div>
        </>
    )
}