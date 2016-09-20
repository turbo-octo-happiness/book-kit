import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Nav from './nav/nav-header-container';
import Sidebar from './sidebar/sidebar-container';
import actions from './redux/actions';

const propTypes = {
  dispatch: PropTypes.func,
  children: PropTypes.object,
};

class PageContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.getBookmarks());
    this.props.dispatch(actions.getFolders());
  }

  render() {
    return (
      <div>
        <Nav />
        <section className="main-section">
          <Sidebar />
          {this.props.children}
        </section>
      </div>
    );
  }
}

PageContainer.propTypes = propTypes;

const Container = connect()(PageContainer);

module.exports = Container;
