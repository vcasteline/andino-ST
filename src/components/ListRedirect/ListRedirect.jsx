import React from "react";
import "./ListRedirect.css"
const uri = process.env.REACT_APP_MARKETPLACE_ROOT_URL;

export const ListRedirect = ({ data }) => {
    return (
        <div className="containerRedirection">
            {
                data.map((index, key) => {
                    return (
                        <div
                            key={key}
                            className="buttonRedirect"
                            onClick={() => handleButtonClick(index.url)}>
                            {index.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

const handleButtonClick = (categori) => {
    const url = uri + "/s?pub_categoryLevel1=" + categori;
    // console.log(url)
    window.location.href = url;
};