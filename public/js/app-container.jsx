import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NavbarContainer from './nav/nav-header-container';
import actions from './redux/actions';

// Renders a splash page and the NavbarContainer component if not logged in,
// otherwise renders children (PageContainer component)

const propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.object,
};

class AppContainer extends React.Component {
  componentDidMount() {
    console.log(actions)
    this.props.dispatch(actions.getBookmarks(this.props.token));
    this.props.dispatch(actions.getFolders(this.props.token));
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
    token: state.auth.token,
  };
}

module.exports = connect(mapStateToProps)(AppContainer);
