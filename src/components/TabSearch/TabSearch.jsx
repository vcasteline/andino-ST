import React from 'react';
const uri = process.env.REACT_APP_MARKETPLACE_ROOT_URL;
// import { object } from 'prop-types';
import './TabSearch.css';
import { useState } from 'react';
import SearchIcon from '../../containers/TopbarContainer/Topbar/SearchIcon';

export const TabSearch = () => {
  // console.log(object)
  const [search, setSearch] = useState('');
  return (
    <div className="container">
      <input
        placeholder="Find Andean goods..."
        className="inputText"
        onChange={e => setSearch(e.target.value)}
        type="search"
      />
      <div className="containerButton" onClick={() => handleButtonClick(search)}>
        <SearchIcon className="searchMenuIcon" />
        <span>Search</span>
      </div>
    </div>
  );
};
const handleButtonClick = search => {
  const url = uri + '/s?keywords=' + search;
  // console.log(url)
  if (search !== '') window.location.href = url;
};
