import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import Folder from '../../public/js/sidebar/sidebar-folder';
import { Link } from 'react-router';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

/* ------- MOCK DATA ------- */
const folder = {
  folderid: 'folderId',
  foldername: 'folderName',
};
const onShowEdit = () => {
  // Test Function
};
const onEdit = () => {
  // Test Function
};
const onDelete = () => {
  // Test Function
};

describe('SidebarFolder Component', () => {
  it('Renders a folder icon and name linking to it\'s route', () => {
    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Folder
        onShowEdit={onShowEdit}
        onEdit={onEdit}
        onDelete={onDelete}
        folder={folder}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('li');

    const folderLink = result.props.children;
    folderLink.type.should.equal(Link);
    folderLink.props.to.should.be.a('string')
      .that.equals('/folders/folderId');
    folderLink.props.children.should.have.length(2);

    const folderIcon = folderLink.props.children[0];
    folderIcon.type.should.equal('i');
    folderIcon.props.className.should.equal('fa fa-folder-o');

    const folderName = folderLink.props.children[1];
    folderName.type.should.equal('span');
    folderName.props.className.should.equal('folder-name');
    folderName.props.children.should.be.a('string')
      .that.equals('folderName');
  });
});
