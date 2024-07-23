import React, { useEffect, useState } from "react";
import './FileQuantityPrice.css'
import QuantityPriceBreaks from "../../containers/EditListingPage/EditListingWizard/QuantityPriceBreaks";

export const FileQuantityPrice = ({ id, name, type, label, placeholder, values }) => {
    const [listQuantity, setListQuantity] = useState([{}]);
    const [quantityWord, setQuantityWord] = useState("");
    const [word1, setWord1] = useState("");
    const [word2, setWord2] = useState("");

    useEffect(() => {
        // if (values[name] !== undefined) {
        //     if (values[name] !== "") {
        //         console.log(values[name])
        //         if (values[name].indexOf(",") !== -1) {
        //             const value = values[name].split(",");
        //             value.map((index, key) => {
        //                 const separate = index.split(":")
        //                 if (key === 0) {
        //                     setListQuantity([{
        //                         quantity: separate[0],
        //                         price: separate[1]
        //                     }])
        //                 } else {
        //                     listQuantity.push({
        //                         quantity: separate[0],
        //                         price: separate[1]
        //                     })
        //                 }
        //             })
        //         } else {
        //             const separate = values[name].split(":")
        //             setListQuantity({
        //                 quantity: separate[0],
        //                 price: separate[1]
        //             })
        //         }
        //     }
        // }
    }, [])

    return (
        <div className="generalContainer">
            <label>{label}</label>
            <div className="containerTitle">
                <label>Quantity Range</label>
                <label>Price</label>
                <label></label>
            </div>
            <>
                {listQuantity.map((index, key) => {
                    return (
                        <div key={key}>
                            <hr />
                            <div className="container">
                                <input
                                    type="text"
                                    placeholder="1-100"
                                    onChange={e => setWord1(e.target.value)}
                                    value={index ? index.quantity : ""}
                                />
                                <input
                                    type="text"
                                    placeholder="5"
                                    onChange={e => {
                                        setWord2(e.target.value)
                                        joinWors(
                                            word1,
                                            word2,
                                            setQuantityWord,
                                            quantityWord,
                                            listQuantity,
                                            name,
                                            values)
                                    }
                                    }
                                    value={index ? index.price : ""}
                                />
                                {listQuantity.length === key + 1 ?
                                    <div
                                        className="buttonMore"
                                        onClick={() => joinWors(
                                            word1,
                                            word2,
                                            setQuantityWord,
                                            quantityWord,
                                            listQuantity,
                                            name,
                                            values)}>
                                        <span >+</span>
                                    </div>
                                    : <span style={{ margin: "3.3%" }}></span>}
                            </div>
                        </div>
                    )
                })
                }</>
        </div>
    )
}

const joinWors = (word1, word2, setQuantityWord, quantityWord, listQuality, name, values) => {
    let word = word1 + ":" + word2
    let allWord
    if (quantityWord === "") {
        allWord = word
    } else {
        allWord = quantityWord + "," + word
    }

    setQuantityWord(allWord)
    listQuality.push({})
    values[name] = allWord
}

