import React, { PropTypes } from 'react';
import Folder from './sidebar-folder-container';

const propTypes = {
  folders: PropTypes.array,
  onAddInput: PropTypes.func,
};

function Sidebar(props) {
  const foldersArr = props.folders.map((folder, index) => {
    return (
      <Folder folder={folder} key={index} />
    );
  });

  return (
    <section className="sidebar">
      <div>
        <input
          type="text"
          onChange={this.props.onAddInput}
          placeholder="Search..."
          className="search-bar"
        />
      </div>
      <div>
        <h3>Folders:</h3>
        <ul>
          {foldersArr}
        </ul>
      </div>
    </section>
  );
}

Sidebar.propTypes = propTypes;

module.exports = Sidebar;
