import React from 'react';
import PropTypes from 'prop-types';

class HomeView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.router.push('/news/1');
  }

  render() {
    return (
      <div />
    );
  }
}
HomeView.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export default HomeView;
