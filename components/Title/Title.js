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
            Radi by sme Ťa/Vás pozvali po obrade k stolu. Prosím pomôž nám
            vyplnením formuláru nižšie - pričom platí “čím skôr, tým lepšie.”
          </p>
          <p>
            Formulár po odoslaní možeš kedykoľvek upraviť tým, že ho znovu
            odošleš /ak je to nutné, kľudne tak sprav, dozvieme sa o tom/.
          </p>
        </div>
      </div>
    </Fragment>
  );
};