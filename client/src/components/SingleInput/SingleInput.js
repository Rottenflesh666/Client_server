import React from 'react';
import "./SingleInput.css";

const SingleInput = (props) => (
  <div className={"form-group"}>
    <label className={"form-label"}>{props.title}</label>
    <input
      className={"form-input"}
      name={props.name}
      type={props.inputType}
      value={props.value}
      onChange={props.controlFunc}
      placeholder={props.placeholder} />
  </div>
);

export default SingleInput;
