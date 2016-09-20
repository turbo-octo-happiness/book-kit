import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Folder from './sidebar-folder-container';
import actions from '../redux/actions';

const propTypes = {
  dispatch: PropTypes.func,
  folders: PropTypes.object,
};

function SidebarContainer(props) {
  // make folders array here
  const foldersArr = props.folders.map((folder, index) => {
    return (
      <Folder key={index} folder={folder} />
    );
  });

  // const tagsArr = this.props.tags.map((tag, index) => {
  //   return (
  //     <Tag key={index} tag={tag} />
  //   );
  // });

  return (
    <section className="sidebar">
      <h3>Folders:</h3>
      <ul>
        {foldersArr}
      </ul>

      <h3>Tags:</h3>
      <ul>
        {/* {tagsArr} */}
      </ul>
    </section>
  );
}

SidebarContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    folders: state.folders,
  };
};

const Container = connect(mapStateToProps)(SidebarContainer);

module.exports = Container;
