import React from 'react';

class HomeView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.location = '/news/1';
  }

  render() {
    return (<div></div>);
  }
}

export default HomeView;
