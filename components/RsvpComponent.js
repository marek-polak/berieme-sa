import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { AXAButtonReact } from './AxaButtonReact/AxaButtonReact';
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
          title="Prides?" 
          desc="Prosim daj nam vediet ci sa zucastnis" 
          options={[{text: 'ano', value: true}, {text: 'nie', value:false}]}
          property={'attend'} 
          value={this.state['attend'] || ''}  
          onChange={this.onQuestionChange} 
        />

        <Question 
          title="S partnerom/-kou?" 
          desc="Donesies svojho specialneho +1?" 
          property={'withPartner'} 
          options={[{text: 'ano', value: true}, {text: 'nie', value:false}]} 
          value={this.state['withPartner'] || ''}  
          onChange={this.onQuestionChange}
        />

        <Question 
          title="Potrebujete ubytovanie?" 
          desc="V priestore je obmedzeny pocet izieb, dalsie su v pesej dostupnosti. Pokial sa chystate prenocovat, 
          dajte nam vediet nech vieme rezervovat kapacitu a poslat vam blizsie info (o cenach, dostupnosti, atd.)" 
          property={'needsAccomodation'} 
          options={[{text: 'ano', value: true}, {text: 'nie', value:false}]} 
          value={this.state['needsAccomodation'] || undefined}  
          onChange={this.onQuestionChange} 
        />

        <Question 
          title="Pocet deti do 2 rokov?" 
          desc="Potrebujeme vediet kolko detskych stoliciek mame zabezpecit :)" 
          property={'kids'} 
          options={[0,1,2,3]} 
          type='slider'
          value={this.state['kids'] || undefined}  
          onChange={this.onQuestionChange} 
        />

        <Question 
          title="Dietne poziadavky" 
          desc="Celiatici, intolerantni na laktozu, alergici na potraviny - dajte nam prosim vediet" 
          property={'dietRequirements'} 
          type='text'
          value={this.state['dietRequirements'] || undefined}  
          onChange={this.onQuestionChange} 
        />

        <Question 
          title="Ine poziadavky" 
          desc="Potrebujete nieco ine/specialne? Prosim, toto pole je pre Vas" 
          property={'specialNeeds'} 
          type='text'
          value={this.state['specialNeeds'] || undefined}  
          onChange={this.onQuestionChange} 
        />

        <AXAButtonReact 
          type='submit'
          icon='upload'
          size='large'
          variant={'inverted-red-tosca'}
          motionOff
          onClick={this.submitForm}>
            Odoslať
        </AXAButtonReact>

        <button onClick={() => this.setState({ liked: true })}>
          Likeaaaaa
        </button>
      </Fragment>
    );
  }
}

const domContainer = document.querySelector("#components");
//domContainer.style.display = 'none';
ReactDOM.render(<RSVPComponent />, domContainer);
