import React from 'react';

function SelectFolder(props) {
  return (
    <option value={props.folder.folderid}>
      {props.folder.foldername}
    </option>
  );
}

module.exports = SelectFolder;
