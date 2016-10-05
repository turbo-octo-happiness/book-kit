import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NavbarContainer from './nav/nav-header-container';
import SplashPage from './content/splash-page';

// Renders a splash page and the NavbarContainer component if not logged in,
// otherwise renders children (PageContainer component)

const propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.object,
};

function AppContainer(props) {
  const display = !props.isAuthenticated ? (
    <SplashPage />
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
