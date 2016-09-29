import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import BookmarkForm from './bookmark-form';
import actions from '../redux/actions';

const propTypes = {
  folders: PropTypes.array,
  dispatch: PropTypes.func,
  token: PropTypes.string,
};

class BookmarkFormContainer extends React.Component {
  constructor() {
    super();
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd(bookmark) {
    console.log('in onAdd, bookmark==>', bookmark);
    this.props.dispatch(actions.addBookmark(bookmark, this.props.token));
  }

  render() {
    return (
      <BookmarkForm
        folders={this.props.folders}
        onAdd={this.onAdd}
      />
    );
  }

}

const mapStateToProps = state => {
  return {
    folders: state.folders,
    token: state.auth.token,
  };
};

BookmarkFormContainer.propTypes = propTypes;

const Container = connect(mapStateToProps)(BookmarkFormContainer);

module.exports = Container;
