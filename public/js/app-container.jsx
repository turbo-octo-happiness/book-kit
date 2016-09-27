import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NavbarContainer from './nav/nav-header-container';

// Renders a splash page and the NavbarContainer component if not logged in,
// otherwise renders children (PageContainer component)

const propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.object,
};

function AppContainer(props) {
  const display = !props.isAuthenticated ? (
    <div className="splash-page">
      <h1>Splash Page Stuff</h1>
    </div>
  ) : (
    props.children
  );

  return (
    <div>
      <NavbarContainer />
      {display}
    </div>
  );
}

AppContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

module.exports = connect(mapStateToProps)(AppContainer);
