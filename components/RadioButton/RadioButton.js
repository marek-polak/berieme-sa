import * as React from 'react';

export const RadioButton = ({title, label, value, checked, onChange, id}) => (
  <React.Fragment>
    <input type="radio" id={id} name={name} value={value} checked={checked} onChange={onChange}></input>
    <label htmlFor={id}>{label}</label>
  </React.Fragment>
);
