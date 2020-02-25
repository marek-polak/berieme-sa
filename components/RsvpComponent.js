import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Title } from "./Title/Title";
import { AxaRadioReact } from './AxaRadioReact/AxaRadioReact';
import { AXAButtonReact } from './AxaButtonReact/AxaButtonReact';

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



const Question = ({ title, desc, options, value, onChange, type }) => {
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
}



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
          value={this.state['attend'] || ''}  
          onChange={(e) => {console.log('called onchange'); this.setState({ attend: e.target.value})}} 
        />

        <Question 
          title="S partnerom/-kou?" 
          desc="Donesies svojho specialneho +1?" 
          options={[{text: 'ano', value: true}, {text: 'nie', value:false}]} 
          value={this.state['withPartner'] || ''}  
          onChange={(e) => {console.log('called onchange'); this.setState({ withPartner: e.target.value})}} 
        />

        <Question 
          title="Potrebujete ubytovanie?" 
          desc="V priestore je obmedzeny pocet izieb, dalsie su v pesej dostupnosti. Pokial sa chystate prenocovat, 
          dajte nam vediet nech vieme rezervovat kapacitu a poslat vam blizsie info (o cenach, dostupnosti, atd.)" 
          options={[{text: 'ano', value: true}, {text: 'nie', value:false}]} 
          value={this.state['needsAccomodation'] || undefined}  
          onChange={(e) => {console.log('called onchange'); this.setState({ needsAccomodation: e.target.value})}} 
        />

        <Question 
          title="Pocet deti do 2 rokov?" 
          desc="Potrebujeme vediet kolko detskych stoliciek mame zabezpecit :)" 
          options={[0,1,2,3]} 
          type='slider'
          value={this.state['kids'] || undefined}  
          onChange={(e) => {console.log('called onchange'); this.setState({ kids: e.target.value})}} 
        />

        <Question 
          title="Dietne poziadavky" 
          desc="Celiatici, intolerantni na laktozu, alergici na potraviny - dajte nam prosim vediet" 
          type='text'
          value={this.state['dietRequirements'] || undefined}  
          onChange={(e) => {console.log('called onchange'); this.setState({ dietRequirements: e.target.value})}} 
        />

        <Question 
          title="Ine poziadavky" 
          desc="Potrebujete nieco ine/specialne? Prosim, toto pole je pre Vas" 
          type='text'
          value={this.state['specialNeeds'] || undefined}  
          onChange={(e) => {console.log('called onchange'); this.setState({ specialNeeds: e.target.value})}} 
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
