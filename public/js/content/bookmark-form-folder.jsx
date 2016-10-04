import React, { PropTypes } from 'react';

const propTypes = {
  folder: PropTypes.object,
};

function SelectFolder(props) {
  return (
    <option value={props.folder.folderid} >
      {props.folder.foldername}
    </option>
  );
}

SelectFolder.propTypes = propTypes;

module.exports = SelectFolder;
