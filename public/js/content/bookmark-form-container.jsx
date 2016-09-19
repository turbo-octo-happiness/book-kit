import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import BookmarkForm from './bookmark-form';
import actions from '../redux/actions';

const propTypes = {
  folders: PropTypes.array,
  dispatch: PropTypes.func,
};

class BookmarkFormContainer extends React.Component {
  constructor() {
    super();
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd(bookmark) {
    this.props.dispatch(actions.addBookmark(bookmark));
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
  };
};

BookmarkFormContainer.propTypes = propTypes;

const Container = connect(mapStateToProps)(BookmarkFormContainer);

module.exports = Container;
