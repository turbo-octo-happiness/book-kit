import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import NavbarContainer from './nav/nav-header-container';

// Renders a splash page and the NavbarContainer component if not logged in,
// otherwise renders children (PageContainer component)

// TODO: If isAuthenticated is true, route to /main (hashHistory.push(main))

const propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.object,
};

class AppContainer extends React.Component {
  componentWillMount() {
    console.log('check');
    if (this.props.isAuthenticated) {
      hashHistory.push('/main');
    }
  }

  render() {
    const display = !this.props.isAuthenticated ? (
      <div className="splash-page">
        <h1>Splash Page Stuff</h1>
      </div>
    ) : (
      this.props.children
    );

    return (
      <div>
        <NavbarContainer />
        {display}
      </div>
    );
  }
}

AppContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

module.exports = connect(mapStateToProps)(AppContainer);
