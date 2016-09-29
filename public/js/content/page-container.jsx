import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import SidebarContainer from '../sidebar/sidebar-container';

const propTypes = {
  children: PropTypes.object,
  dispatch: PropTypes.func,
  token: PropTypes.string,
};

class PageContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.getFolders(this.props.token));
    this.props.dispatch(actions.getBookmarks(this.props.token));
    this.props.dispatch(actions.getTags(this.props.token));
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

PageContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

module.exports = connect(mapStateToProps)(PageContainer);
