import React, { Fragment } from "react";
import { AxaRadioReact } from '../AxaRadioReact/AxaRadioReact';


import "./Question.scss";


export const Question = ({ title, desc, options, value, onChange, type }) => {
  return (
    <Fragment>
      <div >
        <span className="rsvp__question__title">{title}</span>
        <span className="rsvp__question__desc">{desc}</span>
        
        <div className="rsvp__question__options">
          <p>
            You have chosen {value}
          </p>

          {options && options.map((item, index) => 
           <AxaRadioReact
              name={title}
              label={item.text}
              value={item.value+''} // TODO change type
              checked={value === item.value}
              onChange={onChange}
              disabled={false}
              key={item.text + index}
              button
            /> 
          )}

        </div>
      </div>
    </Fragment>
  );
};

