import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Folder from './folder';

class FolderManagement extends React.Component {
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
    this.onShare = this.onShare.bind(this);
  }

  onDelete(folderId) {
    // TODO: Fix issue with folder not deleting in database
    this.props.dispatch(actions.deleteFolder(folderId, this.props.token))
  }

  onShare(folderId) {
    // TODO: dispatch action to share folder
  }

  render() {
    console.log(this.props, '<==== FOLDER CONTAINER PROPS');

    let folders = this.props.folders.map((folder, index) => {
      return (
        <Folder
          key={index}
          folder={folder}
          onDelete={this.onDelete}
          onShare={this.onShare}
          token={this.props.token}
          />
      );
    });

    return(
      <ul>
        {folders}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    folders: state.folders,
  };
}

module.exports = connect(mapStateToProps)(FolderManagement);
