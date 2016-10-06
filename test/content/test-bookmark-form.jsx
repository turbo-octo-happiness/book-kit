import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import BookmarkForm from '../../public/js/content/bookmark-form';
import { Link } from 'react-router';

const should = chai.should();

describe('BookmarkForm Component', () => {
  it('Renders a form to edit an individual bookmark', () => {
    /* ------- MOCK DATA ------- */
    const folder = {
      folderid: 'folderId',
      foldername: 'folderName',
    };
    const folders = [folder];
    const folderName = [
      {
        folder: {
          folderid: 'someid',
          foldername: 'somefolder',
        },
      },
    ];
    const addBookmark = () => {
      // Test Function
    };

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <BookmarkForm
        folders={folders}
        folderName={folderName}
        addBookmark={addBookmark}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('div');
    result.props.className.should.equal('content-section bookmark-form-container');
    result.props.children.type.should.equal('div');
    result.props.children.props.className.should.equal('bookmark-form');
    result.props.children.props.children.should.have.length(2);
    result.props.children.props.children[0].type.should.equal('h2');
    result.props.children.props.children[0].props.children.should.be.a('string')
      .that.equals('Enter a New Bookmark');
    result.props.children.props.children[1].type.should.equal('form');
    result.props.children.props.children[1].props.should.have.property('onSubmit')
      .that.is.a('function');
    result.props.children.props.children[1].props.children.should.have.length(12);

    const form = result.props.children.props.children[1].props.children;

    const title = form[0];
    title.type.should.equal('label');
    title.props.should.have.property('htmlFor')
      .that.equals('form-title');
    title.props.children.should.be.a('string')
      .that.equals('Title *');

    const titleInput = form[1];
    titleInput.type.should.equal('div');
    titleInput.props.children.type.should.equal('input');
    titleInput.props.children.ref.should.be.a('function');
    titleInput.props.children.props.type.should.equal('text');
    titleInput.props.children.props.className.should.equal('form-control');
    titleInput.props.children.props.id.should.equal('form-title');
    titleInput.props.children.props.required.should.equal(true);

    const url = form[2];
    url.type.should.equal('label');
    url.props.should.have.property('htmlFor')
      .that.equals('form-url');
    url.props.children.should.be.a('string')
      .that.equals('URL *');

    const urlInput = form[3];
    urlInput.type.should.equal('div');
    urlInput.props.children.type.should.equal('input');
    urlInput.props.children.ref.should.be.a('function');
    urlInput.props.children.props.type.should.equal('text');
    urlInput.props.children.props.className.should.equal('form-control');
    urlInput.props.children.props.id.should.equal('form-url');

    const description = form[4];
    description.type.should.equal('label');
    description.props.should.have.property('htmlFor')
      .that.equals('form-description');
    description.props.children.should.be.a('string')
      .that.equals('Description');

    const descInput = form[5];
    descInput.type.should.equal('div');
    descInput.props.children.type.should.equal('input');
    descInput.props.children.ref.should.be.a('function');
    descInput.props.children.props.type.should.equal('text');
    descInput.props.children.props.className.should.equal('form-control');
    descInput.props.children.props.id.should.equal('form-description');

    const screenshot = form[6];
    screenshot.type.should.equal('label');
    screenshot.props.should.have.property('htmlFor')
      .that.equals('form-screenshot');
    screenshot.props.children.should.be.a('string')
      .that.equals('Screenshot URL');

    const screenshotInput = form[7];
    screenshotInput.type.should.equal('div');
    screenshotInput.props.children.type.should.equal('input');
    screenshotInput.props.children.ref.should.be.a('function');
    screenshotInput.props.children.props.type.should.equal('text');
    screenshotInput.props.children.props.className.should.equal('form-control');
    screenshotInput.props.children.props.id.should.equal('form-screenshot');

    const tags = form[8];
    tags.type.should.equal('div');
    tags.props.className.should.equal('form-group');
    tags.props.children.should.have.length(2);
    tags.props.children[0].type.should.equal('label');
    tags.props.children[0].props.should.have.property('htmlFor')
      .that.equals('form-tags');
    tags.props.children[0].props.className.should.equal('col-sm-2 control-label');
    tags.props.children[0].props.children.should.be.a('string')
      .that.equals('Tags');

    const tagsInput = form[8].props.children[1];
    tagsInput.type.should.equal('div');
    tagsInput.props.className.should.equal('col-sm-10');
    tagsInput.props.children.type.should.equal('input');
    tagsInput.props.children.ref.should.be.a('function');
    tagsInput.props.children.props.type.should.equal('text');
    tagsInput.props.children.props.className.should.equal('form-control');
    tagsInput.props.children.props.id.should.equal('form-tags');
    tagsInput.props.children.props.placeholder.should.be.a('string')
      .that.equals('separate with comma');

    const folderLabel = form[9];
    folderLabel.type.should.equal('label');
    folderLabel.props.should.have.property('htmlFor')
      .that.equals('form-folder');
    folderLabel.props.children.should.be.a('string')
      .that.equals('Folder *');

    const folderSelect = form[10];
    folderSelect.type.should.equal('div');
    folderSelect.props.children.type.should.equal('select');
    folderSelect.props.children.ref.should.be.a('function');

    const dropDown = folderSelect.props.children.props;
    dropDown.id.should.equal('form-folder');
    dropDown.className.should.equal('folder-dropdown');
    dropDown.required.should.equal(true);
    dropDown.children[0].type.should.be.a('function');
    dropDown.children[0].type.should.have.property('propTypes')
      .that.has.property('folder')
      .that.is.a('function');
    dropDown.children[0].key.should.be.a('string')
      .that.equals('0');
    dropDown.children[0].props.should.have.property('folder');
    dropDown.children[0].props.should.have.deep.property('folder.folderid')
      .that.is.a('string')
      .that.equals('folderId');
    dropDown.children[0].props.should.have.deep.property('folder.foldername')
      .that.is.a('string')
      .that.equals('folderName');

    const buttons = form[11];
    buttons.type.should.equal('div');
    buttons.props.children.should.have.length(2);

    const submitButton = buttons.props.children[0];
    submitButton.type.should.equal('button');
    submitButton.props.type.should.equal('submit');
    submitButton.props.children.should.be.a('string')
      .that.equals('Submit');

    const closeButton = buttons.props.children[1];
    closeButton.type.should.equal(Link);
    closeButton.props.to.should.equal('/main');
    closeButton.props.children.type.should.equal('button');
    closeButton.props.children.props.type.should.equal('button');
    closeButton.props.children.props.children.should.be.a('string')
      .that.equals('Close');
  });
});
