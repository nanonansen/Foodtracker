import React, { Component } from "react";

const Listitem = props => {
  return (
    <li className={props.reaction ? "reaction" : "no-reaction"}>
      <div className="listitem__content">
        <p className="listitem__time">{props.time}</p>
        <h3 className="listitem__title">{props.title}</h3>
      </div>
      <button
        className="listitem__delete"
        onClick={() => handleRemove(props.key)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <title>ic delete 24px</title>
          <g>
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </g>
        </svg>
      </button>
    </li>
  );
};

export default Listitem;
