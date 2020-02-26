import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import update from "immutability-helper";
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";

import { Title } from "./Title/Title";
import { Question } from "./Question/Question";

import "./RsvpComponent.scss";

// mongo stitch connection
const client = Stitch.initializeDefaultAppClient("berieme-sa-qdily");
   
const db = client
  .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
  .db("wedding");

const questions = [
  {
    property: "attend",
    title: "Prídeš?",
    description: "Prosím daj nám vedieť ci sa zúčastníš.",
    options: [
      { text: "áno", value: true },
      { text: "nie", value: false }
    ]
  },
  {
    property: "withPartner",
    title: "S partnerom/-kou?",
    description: "Donesieš svojho špeciálneho +1?",
    options: [
      { text: "áno", value: true },
      { text: "nie", value: false }
    ]
  },
  {
    property: "needsAccomodation",
    title: "Potrebujete ubytovanie?",
    description: `V priestore je obmedzený počet izieb, ďalšie sú 
    v pešej dostupnosti. Pokiaľ sa chystáte prenocovať, dajte nám 
    vedieť nech vieme rezervovať kapacitu a poslať vám bližšie info 
    (o cenách, dostupnosti, atď.)`,
    options: [
      { text: "áno", value: true },
      { text: "nie", value: false }
    ]
  },
  {
    property: "kids",
    title: "Počet detí do dvoch rokov?",
    description:
      "Potrebujeme vedieť koľko detských stoličiek mame zabezpečiť :)",
    options: [0, 1, 2, 3],
    type: "slider"
  },
  {
    property: "dietRequirements",
    title: "Diétne požiadavky",
    description:
      "Celiatici, intolerantní na laktózu, alergici na potraviny - ozvite sa.",
    type: "text"
  },
  {
    property: "specialNeeds",
    title: "Iné?",
    description:
      "Potrebujete niečo iné/špeciálne? Nech sa páči, toto pole je pre Vás.",
    type: "text"
  }
];

class RSVPComponent extends React.Component {
  constructor(props) {
    super(props);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.state = {
      urlParams,
      initialized: false,
      guestInfo: {},
      info: undefined
    };
  }

  componentDidMount() {
    this.retrieveData();
  }


  retrieveData() {
    if (this.state.urlParams.has("uid")) {
      const useruid = this.state.urlParams.get("uid");
      
      client.auth.loginWithCredential(new AnonymousCredential())
      .then(user => {
        console.log`Logged in as anonymous user with id ${user.id}`;
      })      
      .then(() =>
        db
          .collection("guests")
          .find({ uid: useruid }, { limit: 100 })
          .asArray()
      )
      .then(docs => {
        console.log("[MongoDB Stitch] Connected to Stitch");
        console.log("Found docs", docs);
        if (docs.length == 1) {
          this.setState({ initialized: true, guestInfo: docs[0] });
        }
      })
      .catch(err => {
        console.error(err);
      });
    }
  }

  submitForm = () => {
    this.setState({ info: "Odosielam..." });

    const { urlParams, guestInfo } = this.state;
    // remove any property that will be used by update operators
    if (guestInfo && guestInfo.hasOwnProperty("lastModified")) {
      delete guestInfo["lastModified"];
    }

    db.collection("guests")
      .updateOne(
        { uid: urlParams.get("uid") },
        {
          $set: { ...guestInfo, responded: true },
          $currentDate: { lastModified: true }
        }
      )
      .then(result => {
        console.log(
          `${result.matchedCount} document(s) matched the query criteria.`
        );
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        this.setState({ info: "Ďakujeme, údaje sa úspešne odoslali." });
      })
      .catch(err => {
        console.error(err);
      });
  };

  onQuestionChange = (property, value) => {
    console.log("called onchange", property, value);
    this.setState(prevState =>
      update(prevState, { guestInfo: { [property]: { $set: value } } })
    );
  };

  
  render() {
    if (!this.state.urlParams.has("uid")) {
      return null;
    }

    if (!this.state.initialized) {
      return `Strange error occured. No user with id "${this.state.urlParams.get(
        "uid"
      )}" found.`;
    }

    return (
      <Fragment>
        <Title name={this.state.guestInfo.name} />
        {questions.map(item => (
          <Question
            title={item.title}
            desc={item.description}
            key={item.property}
            property={item.property}
            type={item.type}
            options={item.options}
            value={this.state.guestInfo[item.property] || ""}
            onChange={this.onQuestionChange}
          />
        ))}

        <div className="send-info">
          {this.state.info && <p>{this.state.info}</p>}

          <button className="send-button" onClick={this.submitForm}>
            Odoslať
          </button>
        </div>

        <p className="small__print mb-2">
          P.S.: Formulár po odoslaní možeš kedykoľvek upraviť tým, že ho znovu
          odošleš /ak je to nutné, kľudne tak sprav, dozvieme sa o tom/.
        </p>
      </Fragment>
    );
  }
}

const domContainer = document.querySelector("#components");
ReactDOM.render(<RSVPComponent />, domContainer);
