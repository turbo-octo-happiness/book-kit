import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  show: PropTypes.bool,
  folder: PropTypes.object,
  onEdit: PropTypes.func,
  onShowEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

class Folder extends React.Component {
  constructor() {
    super();
    this.editFolder = this.editFolder.bind(this);
  }

  editFolder(event) {
    event.preventDefault();
    this.props.onEdit(this.props.folder.folderid, this.editedFolder.value);
  }

  render() {
    const textStyle = this.props.show ? { display: 'none' } : {};
    const inputStyle = this.props.show ? {} : { display: 'none' };
    return (
      <li>
        <Link to={`/folders/${this.props.folder.foldername}`} style={textStyle}>
          {this.props.folder.foldername}
        </Link>
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
        <span
          onClick={this.props.onShowEdit}
          className="glyphicon glyphicon-pencil"
          aria-hidden="true"
        />
        <span
          onClick={() => { this.props.onDelete(this.props.folder.folderid); }}
          className="glyphicon glyphicon-trash"
          aria-hidden="true"
        />
      </li>
    );
  }
}

Folder.propTypes = propTypes;

module.exports = Folder;
