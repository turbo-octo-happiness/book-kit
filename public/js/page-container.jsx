import React from 'react';
import { connect } from 'react-redux';
import Nav from './nav/nav-header-container';
import actions from './redux/actions';

class PageContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.getBookmarks());
    this.props.dispatch(actions.getFolders());
  }

  render() {
    return (
      <div>
        <Nav />
        <section className="main-section container">
          {this.props.children}
        </section>
      </div>
    );
  }
}

const Container = connect()(PageContainer);

module.exports = Container;
