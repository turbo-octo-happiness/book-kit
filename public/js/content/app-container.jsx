import React from 'react';
import { connect } from 'react-redux'
import NavbarContainer from '../nav/nav-header-container';

// TODO: SET AS SPLASH PAGE? CREATE NEW SPLASH PAGE COMPONENT?
//       IF NOT LOGGED IN, RENDER SPLASH PAGE, OTHERWISE CHILDREN

class Container extends React.Component {
  render() {
    let display = !this.props.isAuthenticated ? (
      <h1>Splash Page Stuff</h1>
    ) : (
      this.props.children
    )

    return (
      <div>
        <NavbarContainer />
        {display}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

module.exports = connect(mapStateToProps)(Container);
