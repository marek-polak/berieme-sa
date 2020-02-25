import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Title } from "./Title/Title";

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



const Question = ({ title, desc, options, value, onChange }) => {
  return (
    <Fragment>
      <div >
        <span className="rsvp__question__title">{title}</span>
        <span className="rsvp__question__desc">{desc}</span>
        
        <div className="rsvp__question__options">
          <p>
            You have chosen {value}
          </p>

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
    this.state = { liked: false, urlParams };
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
          options={['ano', 'nie']} 
          value={this.state['attend'] || ''}  
          onChange={(val) => this.setState({ attend: val})} 
        />
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
