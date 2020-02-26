import React, { Fragment } from "react";

import "./Title.scss";

export const Title = ({ name }) => {
  return (
    <Fragment>
      <div className="rsvp__intro">
        <h1 className="title"> R.S.V.P.</h1>
        <h3> Ahoj {name}, </h3>
        <p>radi by sme Ťa/Vás pozvali po obrade k stolu.</p>
        <div className="info">
          <p>
            Oslava pokračuje cca. od 16:00
            v Modrom dome (NECO Estate Winery) v Modre. -
            <a className="small__print" href="https://goo.gl/maps/BQasm9jB5ihjAePW6">
              <img src="./img/earth.svg" />
              klikni pre otvorenie mapy.
            </a>
          </p>
          <p className="small__print">
            Pomôž nám vyplnením formuláru nižšie, “čím skôr, tým lepšie.”
          </p>
        </div>
      </div>
    </Fragment>
  );
};
