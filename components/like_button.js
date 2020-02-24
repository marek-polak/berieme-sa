'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.state = { liked: false , urlParams};
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    if(this.state.urlParams.has('uid')) {
      return `Ahoj ${this.state.urlParams.get('uid')}`;
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#components');
ReactDOM.render(e(LikeButton), domContainer);