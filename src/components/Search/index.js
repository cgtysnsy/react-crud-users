import { useEffect, useState, useRef } from "react";
import "./style.css";

const Search = ({ getSearch, value, selected, selectType }) => {
  /* const clear = (e) => {
    setInput(" ");
  };*/
  return (
    <div className="search-container">
      <input
        value={value}
        className="search"
        placeholder="Search"
        onChange={(e) => getSearch(e)}
      />
      <select value={selected} onChange={(e) => selectType(e)}>
        <option value="firstname">By First Name</option>
        <option value="lastname">By Last Name</option>
      </select>
    </div>
  );
};

export default Search;
