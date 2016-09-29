import React from 'react';
import { connect } from 'react-redux';
import Nav from '../nav/nav-header-container';
import actions from '../redux/actions';
import SidebarContainer from '../sidebar/sidebar-container';

class PageContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.getBookmarks(this.props.token));
    this.props.dispatch(actions.getFolders(this.props.token));
  }

  render() {
    return (
      <div>
        <section className="main-section container">
          <SidebarContainer />
          <h1>Page Container Stuff</h1>
          {this.props.children}
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

module.exports = connect(mapStateToProps)(PageContainer);
