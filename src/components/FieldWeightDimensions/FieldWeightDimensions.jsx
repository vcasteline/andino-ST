import React from "react";
import './FieldWeightDimensions.css'

export const FieldWeightDimensions = ({ data, values }) => {
    // console.log(values)
    return (
        <>
            <label></label>
            <div className="container">
                <div>
                    <label>Weight</label>
                    <input
                        placeholder={data[6].key + " (lb)"} />
                </div>
                <i class="fas fa-box-open" style={{ fontSize: "7vh" }}></i>
                <div>
                    <label>Dimensions</label>
                    <div className="containerDimensions">
                        <input
                            placeholder={data[5].key + " (in)"} /><span>X</span>
                        <input
                            placeholder={data[3].key + " (in)"} /><span>X</span>
                        <input
                            placeholder={data[3].key + " (in)"} />

                    </div>
                </div>
            </div>
        </>
    )
}