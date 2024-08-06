import React, { useEffect, useState } from "react";
import './FileQuantityPrice.css'


export const FileQuantityPrice = ({ id, name, type, label, placeholder, values, published }) => {
    const [listQuantity, setListQuantity] = useState([{}]);
    const [quantityWord, setQuantityWord] = useState("");
    const [word1, setWord1] = useState("");
    const [word2, setWord2] = useState("");
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [error2, setError2] = useState('');
    const isButtonDisabled = word1 === '' || word2 === '';
    const regex = /^\d+(-\d+|>=|>|)?$/;;
    const regexDollar = /^\d+(\.\d{0,2})?$/;

    useEffect(() => {
        // console.log(listQuantity.length)
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

    const joinWords = (word1, word2, setQuantityWord, quantityWord, listQuality, name, values, setWord1, setWord2) => {
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
        setWord1("")
        setWord2("")
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

    const handleChangeRange = (e) => {
        const inputValue = e.target.value;
        const range = values[name]
        if (range !== null) {
            if (range.indexOf(',') !== -1) {
                const separate = values[name].split(",")
                separate.map((index) => {
                    const separate2 = index.split(":")
                    const first2 = separate2[0].split("-")
                    console.log(first2)

                    if (inputValue >= first2[0] && inputValue <= first2[1]) {
                        setError2("Rango erroneo")
                    } else {
                        setError2("")
                    }
                })
            } else {
                const separate = values[name].split(":")
                const first = separate[0].split("-")
                if (inputValue >= first[0] && inputValue <= first[1]) {
                    setError2("Rango erroneo")
                } else {
                    setError2("")
                }
            }
        }
        if (regex.test(inputValue) || inputValue === '') {
            setWord1(inputValue);
            setError('');
        } else {
            setError('Enter a valid number.');
        }
    };

    const handleChangeDollar = (e) => {
        const inputValue = e.target.value;
        if (regexDollar.test(inputValue) || inputValue === '') {
            setWord2(inputValue);
            setError('');
            // console.log(inputValue)
        } else {
            setError('Enter a valid number.');
        }
    };


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
                            <div className="containerQ">
                                <input
                                    type="text"
                                    placeholder="1-100"
                                    onChange={handleChangeRange}
                                    value={index ? index.quantity : ""}
                                />
                                <input
                                    type="text"
                                    placeholder="5"
                                    onChange={handleChangeDollar}
                                    value={index ? index.price : value}
                                />
                                {listQuantity.length === key + 1 ?
                                    <div
                                        className={word1 && word2 ? "buttonMore" : "buttonMoreDis"}
                                        onClick={() => {
                                            if (word1 && word2) {
                                                joinWords(
                                                    word1,
                                                    word2,
                                                    setQuantityWord,
                                                    quantityWord,
                                                    listQuantity,
                                                    name,
                                                    values,
                                                    setWord1,
                                                    setWord2)
                                            }
                                        }}>
                                        <div>+</div>
                                    </div>
                                    : <>{published ?
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
                                        </div> : <div style={{ marginRight: "4%" }}></div>
                                    }</>

                                }
                            </div>
                        </div>
                    )
                })
                }
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {error2 && <p style={{ color: 'red' }}>{error2}</p>}
            </>
        </div>
    )
}

