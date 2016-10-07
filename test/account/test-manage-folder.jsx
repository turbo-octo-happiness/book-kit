import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { ManageFolders } from '../../public/js/account/manage-folder';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

describe('ManageFolders Component', () => {
  it('Renders an array of FolderContainer components', () => {
    /* ------- MOCK DATA ------- */
    const folder = {
      folderid: 'folderId',
      foldername: 'folderName',
    };
    const folders = [folder];

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <ManageFolders
        folders={folders}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('ul');
    result.props.className.should.equal('content-section');
    result.props.children.should.have.length(2);

    const label = result.props.children[0];
    label.type.should.equal('li');
    label.props.children.type.should.equal('h2');
    label.props.children.props.className.should.equal('folder-header');
    label.props.children.props.children.should.be.a('string')
      .that.equals('Manage Folders:');

    const folderArr = result.props.children[1][0];
    folderArr.props.should.have.property('folder');
  });
});
