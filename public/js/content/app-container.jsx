import React from 'react';
import { connect } from 'react-redux'
import NavbarContainer from '../nav/nav-header-container';

// Renders a splash page and the NavbarContainer component if not logged in,
// otherwise renders children (PageContainer component)

class Container extends React.Component {
  render() {
    let display = !this.props.isAuthenticated ? (
      <div>
        <h1>Splash Page Stuff</h1>
      </div>
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
