import React from "react";
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
            <a className="containerButton" href={"http://localhost:3000/s?keywords=" + search}>
                <IconSearchDesktop />
                <span>Search</span>
            </a>
        </div>
    )
}
