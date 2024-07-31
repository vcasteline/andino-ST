import React, { useEffect, useState } from "react";
import './FileQuantityPrice.css'


export const FileQuantityPrice = ({ id, name, type, label, placeholder, values }) => {
    const [listQuantity, setListQuantity] = useState([{}]);
    const [quantityWord, setQuantityWord] = useState("");
    const [word1, setWord1] = useState("");
    const [word2, setWord2] = useState("");

    useEffect(() => {
        if (values[name] !== null) {
            if (values[name].indexOf(',') !== -1) {
                const separate = values[name].split(",")
                separate.map((index) => {
                    const separate2 = index.split(":")
                    listQuantity.push({
                        quantity: separate2[0],
                        price: separate2[1]
                    })
                })
                setListQuantity(listQuantity.filter(item => Object.keys(item).length !== 0))
            } else {
                const separate = values[name].split(":")
                setListQuantity([...listQuantity, {
                    quantity: separate[0],
                    price: separate[1]
                }])
            }
        }
    }, [])

    const joinWords = (word1, word2, setQuantityWord, quantityWord, listQuality, name, values) => {
        let word = word1 + ":" + word2
        let allWord
        if (quantityWord === "") {
            if (listQuality.length !== 1) {
                allWord = values[name]
            } else {
                allWord = word
            }

        } else {
            allWord = quantityWord + "," + word
        }
        setQuantityWord(allWord)
        listQuality.push({})
        values[name] = allWord
    }

    const deleteWords = (
        listQuantity,
        name,
        values,
        key,
        setListQuantity,
        setQuantityWord) => {
        const indexToRemove = key;
        if (indexToRemove > -1 && indexToRemove < listQuantity.length) {
            listQuantity.splice(indexToRemove, 1);
            setListQuantity(listQuantity)
        }
        const joinWord = listQuantity.map(unir => unir.quantity + ':' + unir.price)
        setQuantityWord(joinWord)
        setTimeout(() => {
            const joinWord = listQuantity.map(unir => `${unir.quantity}:${unir.price}`).join(', ');
            values[name] = joinWord
        }, 1000);
    }


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
                                    onChange={e => setWord2(e.target.value)}
                                    value={index ? index.price : ""}
                                />
                                {listQuantity.length === key + 1 ?
                                    <div
                                        className="buttonMore"
                                        onClick={() => joinWords(
                                            word1,
                                            word2,
                                            setQuantityWord,
                                            quantityWord,
                                            listQuantity,
                                            name,
                                            values)}>
                                        <div>+</div>
                                    </div>
                                    :
                                    <div
                                        className="buttonLess"
                                        onClick={() => deleteWords(
                                            listQuantity,
                                            name,
                                            values,
                                            key,
                                            setListQuantity,
                                            setQuantityWord)}>
                                        <div>-</div>
                                    </div>}
                            </div>
                        </div>
                    )
                })
                }</>
        </div>
    )
}

