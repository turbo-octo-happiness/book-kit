import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import Sidebar from '../../public/js/sidebar/sidebar';
import TagContainer from '../../public/js/sidebar/tags-container';
import { Link } from 'react-router';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

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
const onAddInput = () => {
  // Test Function
};
const addFolder = () => {
  // Test Function
};

describe('Sidebar Component', () => {
  it('Renders search bar and add bookmark button', () => {
    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Sidebar
        tags={tags}
        folders={folders}
        onAddInput={onAddInput}
        addFolder={addFolder}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('section');
    result.props.className.should.equal('sidebar');
    result.props.children.should.have.length(4);

    const searchBar = result.props.children[0];
    searchBar.type.should.equal('div');
    searchBar.props.children.type.should.equal('input');
    searchBar.props.children.props.type.should.equal('text');
    searchBar.props.children.props.onChange.should.be.a('function')
      .that.eqls(onAddInput);
    searchBar.props.children.props.placeholder.should.be.a('string')
      .that.equals('Search...');
    searchBar.props.children.props.className.should.equal('search-bar');

    const addBookmark = result.props.children[1];
    addBookmark.type.should.equal('div');
    addBookmark.props.children.type.should.equal(Link);
    addBookmark.props.children.props.to.should.be.a('string')
      .that.equals('/bookmarks');
    addBookmark.props.children.props.children.type.should.equal('button');
    addBookmark.props.children.props.children.props.className.should.equal('add-bookmark');
    addBookmark.props.children.props.children.props.children.should.be.a('string')
      .that.equals('Add Bookmark');
  });

  it('Renders folder section and input to add new folder', () => {
    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Sidebar
        tags={tags}
        folders={folders}
        onAddInput={onAddInput}
        addFolder={addFolder}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    const folderSection = result.props.children[2];
    folderSection.type.should.equal('div');
    folderSection.props.children.should.have.length(3);
    folderSection.props.children[0].type.should.equal('h3');
    folderSection.props.children[0].props.children.should.be.a('string')
      .that.equals('Folders:');

    const folderInput = folderSection.props.children[1];
    folderInput.props.onSubmit.should.be.a('function');
    folderInput.props.children.type.should.equal('input');
    folderInput.props.children.ref.should.be.a('function');
    folderInput.props.children.props.type.should.equal('text');
    folderInput.props.children.props.placeholder.should.be.a('string')
      .that.equals('Add Folder...');
    folderInput.props.children.props.className.should.equal('add-folder');

    const folderList = folderSection.props.children[2];
    folderList.type.should.equal('ul');
    folderList.props.children[0].type.should.be.a('function');
    folderList.props.children[0].props.folder.should.have.property('folderid')
      .that.is.a('string')
      .that.equals('folderId');
    folderList.props.children[0].props.folder.should.have.property('foldername')
      .that.is.a('string')
      .that.equals('folderName');
  });

  it('Renders tag section and TagContainer component', () => {
    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Sidebar
        tags={tags}
        folders={folders}
        onAddInput={onAddInput}
        addFolder={addFolder}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    const tagSection = result.props.children[3];
    tagSection.type.should.equal('div');
    tagSection.props.children.should.have.length(2);
    tagSection.props.children[0].type.should.equal('h3');
    tagSection.props.children[0].props.children.should.be.a('string')
      .that.equals('Tags:');
    tagSection.props.children[1].type.should.be.a('function')
      .that.eqls(TagContainer);
  });

});
