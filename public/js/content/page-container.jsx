import React from 'react';
import { connect } from 'react-redux';
import Nav from '../nav/nav-header-container';
import actions from '../redux/actions';
import SidebarContainer from '../sidebar/sidebar-container';

class PageContainer extends React.Component {
  componentDidMount() {
    console.log(actions)
    this.props.dispatch(actions.getBookmarks(this.props.token));
    this.props.dispatch(actions.getFolders(this.props.token));
  }

  render() {
    return (
      <section className="main-section">
        <div className="main-container">
          <SidebarContainer />
          {this.props.children}
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

module.exports = connect(mapStateToProps)(PageContainer);
