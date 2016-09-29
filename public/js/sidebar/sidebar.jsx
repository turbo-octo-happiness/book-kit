import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Folder from './sidebar-folder-container';
import TagContainer from './tags-container';

const propTypes = {
  folders: PropTypes.array,
  onAddInput: PropTypes.func,
  addFolder: PropTypes.func,
};

class Sidebar extends React.Component {
  constructor() {
    super();
    this.onAddFolder = this.onAddFolder.bind(this);
  }

  onAddFolder(event) {
    event.preventDefault();
    this.props.addFolder(this.newFolder.value);
    this.newFolder.value = '';
  }

  render() {
    const foldersArr = this.props.folders.map((folder, index) => {
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
          <Link to="/bookmarks">
            <button className="add-bookmark">Add Bookmark</button>
          </Link>
        </div>
        <div>
          <h3>Folders:</h3>
          <form onSubmit={this.onAddFolder}>
            <input
              type="text"
              placeholder="Add Folder..."
              className="add-folder"
              ref={newFolder => { this.newFolder = newFolder; }}
            />
          </form>
          <ul>
            {foldersArr}
          </ul>

        </div>
      </section>
    );
  }
}

Sidebar.propTypes = propTypes;

module.exports = Sidebar;
