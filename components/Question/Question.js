import React, { Fragment } from "react";
import { AxaRadioReact } from '../AxaRadioReact/AxaRadioReact';


import "./Question.scss";


export const Question = ({ title, desc, options, property, value, onChange, type }) => {

  const customHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('customHandleChange', property, e.target.value); 
    onChange(property, e.target.value);
  };

  return (
    <Fragment>
      <div className="rsvp__question">
        <div className="rsvp__question__wrapper">
          <span className="rsvp__question__title">{title}</span>
          <span className="rsvp__question__desc">{desc}</span>
        </div>

        {type && type==='text' && 
          <div className="rsvp__question__options">
            <textarea id={property} rows="4" cols="30" />
          </div> 
        }
        
        <div className="rsvp__question__options">
          {options && options.map((item, index) => 
           <AxaRadioReact
              name={title}
              label={item.text}
              value={item.value} // TODO change type
              checked={value == item.value+''}
              onChange={customHandleChange}
              key={property+ index}
              button
            /> 
          )}

        </div>
      </div>
    </Fragment>
  );
};

