import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

// mongo stitch connection 
const client = stitch.Stitch.initializeDefaultAppClient('berieme-sa-qdily');
const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('wedding');

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

const Title = ({ name }) => {
  return (
    <Fragment>
      <h1> R.S.V.P.</h1>
      <h3> Ahojky {name}</h3>
    </Fragment>
  );
}

class LikeButton extends React.Component {
  constructor(props) {
    super(props);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.state = { liked: false , urlParams};
  }

  retrieveData(){
    if(this.state.urlParams.has('uid')) {
      const useruid = this.state.urlParams.get('uid');
      
      client.auth.loginWithCredential(new stitch.AnonymousCredential())
        .then(() =>
          db.collection('guests').find({uid: useruid}, { limit: 100}).asArray()
        ).then(docs => {
            console.log("Found docs", docs)
            console.log("[MongoDB Stitch] Connected to Stitch")
            this.setState({user: docs[0]}); 
        }).catch(err => {
          console.error(err)
        });
      }
  }
  

  componentDidMount(){
    this.retrieveData();
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    if(this.state.urlParams.has('uid')) {
      return `Ahoj ${this.state.urlParams.get('uid')} - ${JSON.stringify(this.state.user)}`;
    }

    return (
      <Fragment>
        <Title name="Lolloll"/>
        <button onClick={() => this.setState({ liked: true }) }>
          Likeaaaaa
        </button>
      </Fragment>
    );
  }
}


const domContainer = document.querySelector('#components');
//domContainer.style.display = 'none';
ReactDOM.render(<LikeButton />, domContainer);