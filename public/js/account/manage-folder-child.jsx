import React, { PropTypes } from 'react';

const propTypes = {
  folder: PropTypes.object,
  folderid: PropTypes.number,
  dispatch: PropTypes.func,
  token: PropTypes.string,
  onDelete: PropTypes.func,
  onShare: PropTypes.func,
};

class Folder extends React.Component {
  constructor() {
    super();
    this.editFolder = this.editFolder.bind(this);
    this.deleteFolder = this.deleteFolder.bind(this);
    this.shareFolder = this.shareFolder.bind(this);
  }

  editFolder() {
    event.preventDefault();
    this.props.editFolder(
      this.props.folder.folderid,
      this.editedFolder.value
    );
  }

  deleteFolder() {
    this.props.deleteFolder(this.props.folder.folderid);
  }

  shareFolder(event) {
    event.preventDefault();
    this.props.shareFolder(
      this.props.folder.folderid,
      this.share.value
    );

    this.share.value = '';
  }

  render() {
    const textStyle = this.props.show ? { display: 'none' } : {};
    const inputStyle = this.props.show ? {} : { display: 'none' };
    const shareStyle = this.props.showShare ? {} : { display: 'none' };

    let sharedUsers = [];

    if (this.props.folder.members) {
      if (this.props.folder.members.length > 1) {
        sharedUsers = this.props.folder.members.map((member, index) => {
          return (
            <li key={index}>{member}</li>
          );
        });
      }
    }

    const shared = sharedUsers.length ? (
      <ul className="folder-share">
        <li>
          <h5>Users:</h5>
        </li>
        {sharedUsers}
      </ul>
    ) : (
      <ul />
    );

    return (
      <li className="manage-folder-container">
        <div className="manage-folder">
          <h3 style={textStyle}>{this.props.folder.foldername}</h3>
          <form
            onSubmit={this.editFolder}
            style={inputStyle}
          >
            <input
              type="text"
              ref={editedFolder => { this.editedFolder = editedFolder; }}
              defaultValue={this.props.folder.foldername}
            />
          </form>
          <div className="manage-buttons">
            <form
              onSubmit={this.shareFolder}
              style={shareStyle}
            >
              <input
                type="text"
                ref={share => { this.share = share; }}
                placeholder="Add email address..."
              />
            </form>
            <button
              onClick={this.props.onShowEdit}
              aria-hidden="true"
            >Edit
            </button>
            <button
              onClick={this.deleteFolder}
            >Delete
            </button>
            <button
              onClick={this.props.onShowShare}
            >Share
            </button>
          </div>
        </div>
        {shared}
      </li>
    );
  }
}

module.exports = Folder;
