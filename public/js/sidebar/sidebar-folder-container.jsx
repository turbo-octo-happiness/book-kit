import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import SidebarFolder from './sidebar-folder';

const propTypes = {
  dispatch: PropTypes.func,
  folder: PropTypes.object,
  token: PropTypes.string,
};

class FolderContainer extends React.Component {
  constructor() {
    super();
    this.onShowEdit = this.onShowEdit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      show: false,
    };
  }

  onDelete(id) {
    // FIXME: issue when deleting a folder that is being used by a bookmark
    // it doesn't fail gracefully. should warn the user
    this.props.dispatch(actions.deleteFolder(id));
  }

  onEdit(id, folderName) {
    console.log('in on edit');
    this.props.dispatch(actions.editFolder(id, folderName, this.props.token));
    this.onShowEdit();
  }

  onShowEdit() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <SidebarFolder
        show={this.state.show}
        onShowEdit={this.onShowEdit}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
        folder={this.props.folder}
      />
    );
  }
}

FolderContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

const Container = connect(mapStateToProps)(FolderContainer);

module.exports = Container;
