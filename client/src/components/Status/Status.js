import React from 'react';
import './Status.css';

const Status = (props) => (
  <div className={"status-group"}>
    <p>{props.status.fullName}</p>
    <p>{props.status.light}</p>
    <p>{props.status.gas}</p>
    <p>{props.status.water}</p>
  </div>
);

export default Status;
