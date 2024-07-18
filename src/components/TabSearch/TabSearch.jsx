import React from "react";
const uri = process.env.REACT_APP_MARKETPLACE_ROOT_URL;
import IconSearchDesktop from '../../containers/TopbarContainer/Topbar/TopbarSearchForm/IconSearchDesktop';
import "./TabSearch.css"
import { useState } from "react";

export const TabSearch = () => {
    const [search, setSearch] = useState("");
    return (
        <div className="container">
            <input
                placeholder="Find"
                className="inputText"
                onChange={(e) => setSearch(e.target.value)}
                type="search" />
            <div className="containerButton"
                onClick={() => handleButtonClick(search)}>
                <i class="fas fa-search fa-rotate-90" style={{ color: "#ffffff", fontSize: "30px" }}></i>
                <span>Search</span>
            </div>
        </div>
    )



}
const handleButtonClick = (search) => {
    const url = uri + "/s?keywords=" + search;
    // console.log(url)
    window.location.href = url;
};