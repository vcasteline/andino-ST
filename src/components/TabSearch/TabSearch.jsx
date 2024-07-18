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
                onChange={(e) => setSearch(e.target.value)} />
            <a className="containerButton" href={uri + "/s?keywords=" + search}>
                <IconSearchDesktop />
                <span>Search</span>
            </a>
        </div>
    )
}
