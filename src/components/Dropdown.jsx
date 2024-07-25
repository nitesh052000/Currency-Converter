import React from "react";

const Dropdown = ({ title, currency, setCurrency, current }) => {
  return (
    <div>
      <label htmlFor={title}>{title}</label>
      <div>
        <select
          value={current}
          onChange={(e) => setCurrency(e.target.value)}
          className=" w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {currency?.map((curr) => {
            return (
              <option value={curr} key={curr}>
                {curr}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
