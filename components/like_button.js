'use strict';

const e = React.createElement;

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

class LikeButton extends React.Component {
  constructor(props) {
    super(props);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.state = { liked: false , urlParams};
  }

  retrieveData = async () => {
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

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}


const domContainer = document.querySelector('#components');
domContainer.style.display = 'none';
ReactDOM.render(e(LikeButton), domContainer);