import * as React from 'react';
import createAXARadioReact from '@axa-ch/radio/lib/index.react';

export const AxaRadioReact = createAXARadioReact(React.createElement);

/* export const AxaRadioReact = ({title, label, value, checked, onChange}) => (
  <React.Fragment>
    <input type="radio" name={name} value={value} checked={checked} onChange={onChange}></input>
    <label>{label}</label>
  </React.Fragment>
); */
