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
    return (
      <li>
        <Link to={`/folders/${this.props.folder.foldername}`}>
          <i className="fa fa-folder-o" aria-hidden="true" />
          <span className="folder-name">{this.props.folder.foldername}</span>
        </Link>
      </li>
    );
  }
}

Folder.propTypes = propTypes;

module.exports = Folder;
