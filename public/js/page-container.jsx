import React from 'react';
import { connect } from 'react-redux';
import Nav from './nav/nav-header-container';
import actions from './redux/actions';
import SidebarContainer from './sidebar/sidebar-container';

class PageContainer extends React.Component {
  componentDidMount() {
    console.log(actions)
    console.log('PageContainer this.props.token: ', this.props.token)
    this.props.dispatch(actions.getBookmarks(this.props.token));
    this.props.dispatch(actions.getFolders(this.props.token));
  }

  render() {
    return (
      <div>
        <Nav />
        <section className="main-section container">
          <SidebarContainer />
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

const Container = connect(mapStateToProps)(PageContainer);

module.exports = Container;
