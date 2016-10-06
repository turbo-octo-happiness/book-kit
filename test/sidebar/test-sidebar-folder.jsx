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
  it('Renders an individual folder and icon', () => {
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
    result.props.children.type.should.equal(Link);
    result.props.children.props.to.should.be.a('string')
      .that.equals('/folders/folderId');
    result.props.children.props.children.should.have.length(2);
    result.props.children.props.children[0].type.should.equal('i');
    result.props.children.props.children[0].props.className.should.equal('fa fa-folder-o');
    result.props.children.props.children[1].type.should.equal('span');
    result.props.children.props.children[1].props.className.should.equal('folder-name');
    result.props.children.props.children[1].props.children.should.be.a('string')
      .that.equals('folderName');
  });
});
