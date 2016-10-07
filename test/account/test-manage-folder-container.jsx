import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { FolderContainer } from '../../public/js/account/manage-folder-container';
import Folder from '../../public/js/account/manage-folder-child';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

describe('FolderContainer Component', () => {
  it('Passes props to Folder component', () => {
    /* ------- MOCK DATA ------- */
    const folder = {
      folderid: 'folderId',
      foldername: 'folderName',
    };

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <FolderContainer />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal(Folder);
    result.props.show.should.be.a('boolean');
    result.props.showShare.should.be.a('boolean');
    result.props.deleteFolder.should.be.a('function');
    result.props.shareFolder.should.be.a('function');
    result.props.onShowShare.should.be.a('function');
    result.props.onShowEdit.should.be.a('function');
    result.props.editFolder.should.be.a('function');
  });
});
