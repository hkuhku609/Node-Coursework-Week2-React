import React, { useState } from "react";
import { DisplayStylePropsType } from "../utils/types";

const DisplayStyle = ({
  changeDisplay,
  searchFromApp,
}: DisplayStylePropsType) => {
  const [searchValue, setSearchValue] = useState("");
  const radio = (radioValue: string) => {
    changeDisplay(radioValue);
    setSearchValue("");
  };
  const search = (searchVal: string) => {
    setSearchValue(searchVal);
    searchFromApp(searchVal);
  };
  return (
    <div className="display-search">
      <div
        className="radio-container"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          radio(e.target.value)
        }
      >
        Display:
        <input type="radio" id="all" name="display" value="all" />
        <label htmlFor="all">All Messages</label>
        <input
          type="radio"
          id="latest"
          name="display"
          value="latest"
          defaultChecked
        />
        <label htmlFor="latest">Latest 10 Messages</label>
      </div>
      <input
        type="text"
        name="search"
        value={searchValue}
        placeholder="Search words"
        onChange={(e) => search(e.target.value.toLowerCase())}
      />
    </div>
  );
};

export default DisplayStyle;
