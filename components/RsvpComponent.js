import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { Title } from "./Title/Title";
import { Question } from "./Question/Question";

import "./RsvpComponent.scss";

// mongo stitch connection
const client = stitch.Stitch.initializeDefaultAppClient("berieme-sa-qdily");
const db = client
  .getServiceClient(stitch.RemoteMongoClient.factory, "mongodb-atlas")
  .db("wedding");

/*       client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(user =>
        db.collection('guests').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
      ).then(() =>
        db.collection('guests').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
      ).then(docs => {
          console.log("Found docs", docs)
          console.log("[MongoDB Stitch] Connected to Stitch")
      }).catch(err => {
        console.error(err)
      }); */



class RSVPComponent extends React.Component {
  constructor(props) {
    super(props);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.state = { liked: false, urlParams, attend: false };
  }

  retrieveData() {
    if (this.state.urlParams.has("uid")) {
      const useruid = this.state.urlParams.get("uid");

      client.auth
        .loginWithCredential(new stitch.AnonymousCredential())
        .then(() =>
          db
            .collection("guests")
            .find({ uid: useruid }, { limit: 100 })
            .asArray()
        )
        .then(docs => {
          console.log("Found docs", docs);
          console.log("[MongoDB Stitch] Connected to Stitch");
          this.setState({ user: docs[0] });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  submitForm = () => {

  }

  onQuestionChange = (property, value) => {
    console.log('called onchange', property, value); 
    this.setState({ [property]: value});
  }

  componentDidMount() {
    this.retrieveData();
  }

  render() {
    if (this.state.liked) {
      return "You liked this.";
    }

    if (this.state.urlParams.has("uid")) {
      return `Ahoj ${this.state.urlParams.get("uid")} - ${JSON.stringify(
        this.state.user
      )}`;
    }

    return (
      <Fragment>
        <Title name="Zdenka" />
        <Question 
          title="Prídeš?" 
          desc="Prosím daj nám vedieť ci sa zúčastníš." 
          options={[{text: 'áno', value: true}, {text: 'nie', value:false}]}
          property={'attend'} 
          value={this.state['attend'] || ''}  
          onChange={this.onQuestionChange} 
        />

        <Question 
          title="S partnerom/-kou?" 
          desc="Donesieš svojho špeciálneho +1?" 
          property={'withPartner'} 
          options={[{text: 'áno', value: true}, {text: 'nie', value:false}]} 
          value={this.state['withPartner'] || ''}  
          onChange={this.onQuestionChange}
        />

        <Question 
          title="Potrebujete ubytovanie?" 
          desc="V priestore je obmedzený počet izieb, ďalšie sú v pešej dostupnosti. Pokiaľ sa chystáte prenocovať, dajte nám vedieť nech vieme rezervovať kapacitu a poslať vám bližšie info (o cenách, dostupnosti, atď.)" 
          property={'needsAccomodation'} 
          options={[{text: 'áno', value: true}, {text: 'nie', value:false}]} 
          value={this.state['needsAccomodation'] || undefined}  
          onChange={this.onQuestionChange} 
        />

        <Question 
          title="Počet detí do dvoch rokov?" 
          desc="Potrebujeme vedieť koľko detských stoličiek mame zabezpečiť :)" 
          property={'kids'} 
          options={[0,1,2,3]} 
          type='slider'
          value={this.state['kids'] || undefined}  
          onChange={this.onQuestionChange} 
        />

        <Question 
          title="Diétne požiadavky" 
          desc="Celiatici, intolerantní na laktózu, alergici na potraviny - ozvite sa." 
          property={'dietRequirements'} 
          type='text'
          value={this.state['dietRequirements'] || undefined}  
          onChange={this.onQuestionChange} 
        />

        <Question 
          title="Iné?" 
          desc="Potrebujete niečo iné/špeciálne? Nech sa páči, toto pole je pre Vás." 
          property={'specialNeeds'} 
          type='text'
          value={this.state['specialNeeds'] || undefined}  
          onChange={this.onQuestionChange} 
        />

        <button className="send-button" onClick={() => this.setState({ liked: true })}>
          Odoslať
        </button>

        <p className="small__print mb-2">
            P.S.: Formulár po odoslaní možeš kedykoľvek upraviť tým, že ho znovu
            odošleš /ak je to nutné, kľudne tak sprav, dozvieme sa o tom/.
          </p>

      </Fragment>
    );
  }
}

const domContainer = document.querySelector("#components");
//domContainer.style.display = 'none';
ReactDOM.render(<RSVPComponent />, domContainer);
