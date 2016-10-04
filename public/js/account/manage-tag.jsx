import React from 'react';
import { connect } from 'react-redux';
import FolderContainer from './manage-folder-container';

function ManageFolders(props) {
  const { tags } = props;
  const tagsArr = tags.map((tag, index) => {
    return (
      <TagContainer
        key={index}
        folder={folder}
      />
    );
  });

  return (
    <ul className="content-section">
      <li>
        <h2 className="folder-header">
          Manage Tags:
        </h2>
      </li>
      {foldersArr}
    </ul>
  );
}

function mapStateToProps(state) {
  return {
    tags: state.tags,
  };
}

module.exports = connect(mapStateToProps)(ManageFolders);
