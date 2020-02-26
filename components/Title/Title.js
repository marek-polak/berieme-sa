import React, { Fragment } from "react";

import "./Title.scss";

export const Title = ({ name }) => {
  return (
    <Fragment>
      <div className="rsvp__intro">
        <h1 className="title"> R.S.V.P.</h1>
        <h3> Ahoj {name}</h3>
        <div className="info">
          <p>
            Radi by sme Ťa/Vás pozvali po obrade k stolu. Pomôž nám
            vyplnením formuláru nižšie, “čím skôr, tým lepšie.”
          </p>
          <p className="small__print">
            lalala
          </p>
        </div>
      </div>
    </Fragment>
  );
};