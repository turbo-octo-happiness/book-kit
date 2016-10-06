import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import BookmarkView from './bookmark-view';
import Folder from './bookmark-form-folder';
import actions from '../redux/actions';

const propTypes = {
  dispatch: PropTypes.func,
  bookmarks: PropTypes.array,
  params: PropTypes.object,
  folders: PropTypes.array,
  token: PropTypes.string,
};

export class BookmarkViewContainer extends React.Component {
  constructor() {
    super();
    this.onShowDelete = this.onShowDelete.bind(this);
    this.onShowEdit = this.onShowEdit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      show: false,
      delete: false,
    };
  }

  onShowEdit() {
    this.setState({
      show: !this.state.show,
    });
  }

  onShowDelete() {
    this.setState({
      delete: !this.state.delete,
    });
  }

  onEdit(bookmark) {
    this.props.dispatch(actions.editBookmark(bookmark, this.props.token));
    this.onShowEdit();
  }

  onDelete(id) {
    this.props.dispatch(actions.deleteBookmark(id, this.props.token));
    this.onShowDelete();
  }

  render() {
    if (!this.props.bookmarks.length) {
      return null;
    }

    const id = this.props.params.bookmarkId;
    const bookmark = this.props.bookmarks.filter((bkmark) => {
      if (bkmark.bookmarkid !== null) {
        return id === bkmark.bookmarkid.toString();
      }
    });

    const folderArr = [];
    this.props.folders.forEach((folder, index) => {
      folderArr.push(<Folder key={index} folder={folder} />);
    });

    return (
      <BookmarkView
        onShowEdit={this.onShowEdit}
        onShowDelete={this.onShowDelete}
        onEdit={this.onEdit}
        onDelete={this.onDelete}
        delete={this.state.delete}
        show={this.state.show}
        bookmark={bookmark}
        folderArr={folderArr}
        folders={this.props.folders}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    bookmarks: state.bookmarks,
    folders: state.folders,
    token: state.auth.token,
  };
};

BookmarkViewContainer.propTypes = propTypes;

export default connect(mapStateToProps)(BookmarkViewContainer);
