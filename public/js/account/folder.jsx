import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

class Folder extends React.Component {
  constructor() {
    super();
    this.onShowEdit = this.onShowEdit.bind(this);
    this.editFolder = this.editFolder.bind(this);
    this.deleteFolder = this.deleteFolder.bind(this);
    this.state = {
      show: false,
    };
  }

  onShowEdit() {
    this.setState({
      show: !this.state.show,
    });
  }

  editFolder(event, folderId, folderName) {
    event.preventDefault();
    this.props.dispatch(actions.editFolder(this.props.folder.folderid, this.editedFolder.value, this.props.token));
    this.onShowEdit();
  }

  deleteFolder(folderId) {
    this.props.onDelete(this.props.folder.folderid);
  }

  render() {
    const textStyle = this.state.show ? { display: 'none' } : {};
    const inputStyle = this.state.show ? {} : { display: 'none' };
    return(
      <div>
        <li>
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
          <button
            onClick={this.onShowEdit}
            aria-hidden="true"
            >Edit
          </button>
          <button
            onClick={this.deleteFolder}
            >Delete
          </button>
          <button
            onClick={this.props.onShare}
            >Share
          </button>
        </li>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

module.exports = connect(mapStateToProps)(Folder);
