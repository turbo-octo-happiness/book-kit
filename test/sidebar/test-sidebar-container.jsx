import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { SidebarContainer } from '../../public/js/sidebar/sidebar-container';
import Sidebar from '../../public/js/sidebar/sidebar';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

describe('SidebarContainer Component', () => {
  it('Passes folders and tags state to child components', () => {
    /* ------- MOCK DATA ------- */
    const folder = {
      folderid: 'folderId',
      foldername: 'folderName',
    };
    const folders = [folder];
    const tag = {
      tagid: 'tagId',
      tagname: 'tagName',
    };
    const tags = [tag];

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <SidebarContainer
        folders={folders}
        tags={tags}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.be.a('function')
      .that.eqls(Sidebar);

    result.props.folders.should.be.a('array');
    result.props.folders[0].should.be.a('object');
    result.props.folders[0].should.have.property('folderid')
      .that.is.a('string')
      .that.equals('folderId');
    result.props.folders[0].should.have.property('foldername')
      .that.is.a('string')
      .that.equals('folderName');

    result.props.tags.should.be.a('array');
    result.props.tags[0].should.be.a('object');
    result.props.tags[0].should.have.property('tagid')
      .that.is.a('string')
      .that.equals('tagId');
    result.props.tags[0].should.have.property('tagname')
      .that.is.a('string')
      .that.equals('tagName');

    result.props.onAddInput.should.be.a('function');
    result.props.addFolder.should.be.a('function');
  });
});
