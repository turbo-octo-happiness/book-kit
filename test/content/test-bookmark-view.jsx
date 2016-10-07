import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import BookmarkView from '../../public/js/content/bookmark-view';
import { Link } from 'react-router';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

/* ------- MOCK DATA ------- */
const bookmark = [{
  bookmarkid: 'bookmarkId',
  title: 'bookmarkTitle',
  url: 'bookmarkUrl',
  description: 'bookmarkDesc',
  screenshot: 'bookmarkImg',
  tags: [
    { tagid: 'tagId', tagname: 'tagName' },
  ],
  folderid: 'folderId',
}];

const folder = {
  folderid: 'folderId',
  foldername: 'folderName',
};
const folders = [folder];
const folderArr = [folder];
const onShowEdit = () => {
  // Test Function
};
const onShowDelete = () => {
  // Test Function
};
const onEdit = () => {
  // Test Function
};
const onDelete = () => {
  // Test Function
};


describe('BookmarkView Component', () => {
  it('Renders bookmark details and hides editing form when show state is false', () => {
    /* ------- MOCK DATA ------- */
    const deleteState = false;
    const showState = false;

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <BookmarkView
        onShowEdit={onShowEdit}
        onShowDelete={onShowDelete}
        onEdit={onEdit}
        onDelete={onDelete}
        delete={deleteState}
        show={showState}
        bookmark={bookmark}
        folderArr={folderArr}
        folders={folders}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result.props.children[0].props.children[0], '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('section');
    result.props.className.should.equal('content-section bookmark-section');
    result.props.children.should.have.length(2);

    const view = result.props.children[0];
    view.type.should.equal('div');
    view.props.className.should.equal('bookmark-view');
    view.props.style.should.be.a('object')
      .that.eqls({});
    view.props.children.should.have.length(10);

    const header = view.props.children[0];
    header.type.should.equal('div');
    header.props.className.should.equal('bookmark-header');
    header.props.children.should.have.length(2);

    const title = header.props.children[0];
    title.type.should.equal('div');
    title.props.className.should.equal('bookmark-title');
    title.props.children.should.have.length(2);
    title.props.children[0].type.should.equal('h2');
    title.props.children[0].props.children.should.be.a('string')
      .that.equals('bookmarkTitle');

    const url = title.props.children[1];
    url.type.should.equal('h4');
    url.props.children.type.should.equal('a');
    url.props.children.props.should.have.property('href')
      .that.equals('bookmarkUrl');
    url.props.children.props.children.should.be.a('string')
      .that.equals('bookmarkUrl');

    const screenshot = header.props.children[1];
    screenshot.type.should.equal('div');
    screenshot.props.className.should.equal('bookmark-screenshot');
    screenshot.props.style.should.have.property('backgroundImage')
      .that.is.a('string')
      .that.equals('url(bookmarkImg)');

    const desc = view.props.children[1];
    desc.type.should.equal('p');
    desc.props.children.should.be.a('string')
      .that.equals('bookmarkDesc');

    const bookmarkFolder = view.props.children;
    bookmarkFolder[2].type.should.equal('h4');
    bookmarkFolder[2].props.children.should.be.a('string')
      .that.equals('Folder:');
    bookmarkFolder[3].type.should.equal('p');
    bookmarkFolder[3].props.children.should.be.a('string')
      .that.equals('folderName');

    const edit = view.props.children[4];
    edit.type.should.equal('button');
    edit.props.style.should.be.a('object')
      .that.eqls({});
    edit.props.onClick.should.be.a('function')
      .that.eqls(onShowEdit);
    edit.props.children.should.be.a('string')
      .that.equals('Edit');

    const cancel = view.props.children[5];
    cancel.type.should.equal('button');
    cancel.props.style.should.be.a('object')
      .that.has.property('display')
      .that.is.a('string')
      .that.equals('none');
    cancel.props.onClick.should.be.a('function')
      .that.eqls(onShowEdit);
    cancel.props.children.should.be.a('string')
      .that.equals('Cancel');

    const del = view.props.children[6];
    del.type.should.equal('button');
    del.props.style.should.be.a('object')
      .that.eqls({});
    del.props.onClick.should.be.a('function')
      .that.eqls(onShowDelete);
    del.props.children.should.be.a('string')
      .that.equals('Delete');

    const confirmDel = view.props.children[7];
    confirmDel.type.should.equal(Link);
    confirmDel.props.to.should.be.a('string')
      .that.equals('/main');
    confirmDel.props.style.should.be.a('object')
      .that.has.property('display')
      .that.is.a('string')
      .that.equals('none');
    confirmDel.props.children.type.should.equal('button');
    confirmDel.props.children.props.children.should.be.a('string')
      .that.equals('Confirm');

    const cancelDel = view.props.children[8];
    cancelDel.type.should.equal('button');
    cancelDel.props.style.should.be.a('object')
      .that.has.property('display')
      .that.is.a('string')
      .that.equals('none');
    cancelDel.props.onClick.should.be.a('function')
      .that.eqls(onShowDelete);
    cancelDel.props.children.should.be.a('string')
      .that.equals('Cancel');

    const close = view.props.children[9];
    close.type.should.equal(Link);
    close.props.to.should.be.a('string')
      .that.equals('/main');
    close.props.style.should.be.a('object')
      .that.eqls({});
    close.props.children.type.should.equal('button');
    close.props.children.props.children.should.be.a('string')
      .that.equals('Close');
  });

  it('Renders bookmark editing form and hides bookmark details when show state is true', () => {
    /* ------- MOCK DATA ------- */
    const showState = true;

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <BookmarkView
        onShowEdit={onShowEdit}
        onShowDelete={onShowDelete}
        onEdit={onEdit}
        onDelete={onDelete}
        show={showState}
        bookmark={bookmark}
        folderArr={folderArr}
        folders={folders}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result.props, '<<< RESULT');

    /* ------- TESTS -------- */
    const view = result.props.children[0];

    const edit = view.props.children[4];
    edit.type.should.equal('button');
    edit.props.style.should.be.a('object')
      .that.has.property('display')
      .that.is.a('string')
      .that.equals('none');
    edit.props.onClick.should.be.a('function')
      .that.eqls(onShowEdit);
    edit.props.children.should.be.a('string')
      .that.equals('Edit');

    const editForm = result.props.children[1];
    editForm.type.should.equal('div');
    editForm.props.className.should.equal('bookmark-edit');
    editForm.props.style.should.be.a('object')
      .that.eqls({});

    const form = editForm.props.children;
    form.type.should.equal('form');
    form.props.onSubmit.should.be.a('function');
    form.props.children.should.have.length(15);

    const titleText = form.props.children[0];
    titleText.type.should.equal('h4');
    titleText.props.children.should.be.a('string')
      .that.equals('Title *');

    const titleInput = form.props.children[1];
    titleInput.type.should.equal('input');
    titleInput.ref.should.be.a('function');
    titleInput.props.type.should.equal('text');
    titleInput.props.defaultValue.should.be.a('string')
      .that.equals('bookmarkTitle');
    titleInput.props.placeholder.should.be.a('string')
      .that.equals('Title *');
    titleInput.props.required.should.equal(true);

    const urlText = form.props.children[2];
    urlText.type.should.equal('h4');
    urlText.props.children.should.be.a('string')
      .that.equals('URL *');

    const urlInput = form.props.children[3];
    urlInput.type.should.equal('input');
    urlInput.ref.should.be.a('function');
    urlInput.props.type.should.equal('text');
    urlInput.props.defaultValue.should.be.a('string')
      .that.equals('bookmarkUrl');
    urlInput.props.placeholder.should.be.a('string')
      .that.equals('URL *');
    urlInput.props.required.should.equal(true);

    const descText = form.props.children[4];
    descText.type.should.equal('h4');
    descText.props.children.should.be.a('string')
      .that.equals('Description');

    const descInput = form.props.children[5];
    descInput.type.should.equal('textarea');
    descInput.ref.should.be.a('function');
    descInput.props.className.should.equal('edit-description');
    descInput.props.defaultValue.should.be.a('string')
      .that.equals('bookmarkDesc');
    descInput.props.placeholder.should.be.a('string')
      .that.equals('Description');
    descInput.props.rows.should.equal('7');

    const screenshotText = form.props.children[6];
    screenshotText.type.should.equal('h4');
    screenshotText.props.children.should.be.a('string')
      .that.equals('Screenshot URL');

    const screenshotInput = form.props.children[7];
    screenshotInput.type.should.equal('input');
    screenshotInput.ref.should.be.a('function');
    screenshotInput.props.type.should.equal('text');
    screenshotInput.props.defaultValue.should.be.a('string')
      .that.equals('bookmarkImg');
    screenshotInput.props.placeholder.should.be.a('string')
      .that.equals('Screenshot URL');

    const tagsText = form.props.children[8];
    tagsText.type.should.equal('h4');
    tagsText.props.children.should.be.a('string')
      .that.equals('Tags');

    const tagsInput = form.props.children[9];
    tagsInput.type.should.equal('input');
    tagsInput.ref.should.be.a('function');
    tagsInput.props.type.should.equal('text');
    tagsInput.props.className.should.equal('form-control');
    tagsInput.props.defaultValue.should.be.a('array');
    tagsInput.props.defaultValue[0].should.be.a('string')
      .that.equals('tagName');

    const folderText = form.props.children[10];
    folderText.type.should.equal('h4');
    folderText.props.children.should.be.a('string')
      .that.equals('Folder *');

    const folderSelect = form.props.children[11];
    folderSelect.type.should.equal('select');
    folderSelect.ref.should.be.a('function');
    folderSelect.props.required.should.equal(true);
    folderSelect.props.children.should.be.a('array');
    folderSelect.props.children[0].should.be.a('object');
    folderSelect.props.children[0].should.have.property('folderid')
      .that.is.a('string')
      .that.equals('folderId');
    folderSelect.props.children[0].should.have.property('foldername')
      .that.is.a('string')
      .that.equals('folderName');

    form.props.children[12].type.should.equal('br');

    const submitButton = form.props.children[13];
    submitButton.type.should.equal('button');
    submitButton.props.type.should.equal('submit');
    submitButton.props.children.should.be.a('string')
      .that.equals('Submit');

    const cancelButton = form.props.children[14];
    cancelButton.type.should.equal('button');
    cancelButton.props.onClick.should.be.a('function');
    cancelButton.props.children.should.be.a('string')
      .that.equals('Cancel');
  });

  it('Renders CONFIRM and CANCEL button and hides DELETE when delete state is true', () => {
    /* ------- MOCK DATA ------- */
    const deleteState = true;
    const showState = false;

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <BookmarkView
        onShowEdit={onShowEdit}
        onShowDelete={onShowDelete}
        onEdit={onEdit}
        onDelete={onDelete}
        show={showState}
        delete={deleteState}
        bookmark={bookmark}
        folderArr={folderArr}
        folders={folders}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result.props, '<<< RESULT');

    /* ------- TESTS -------- */
    const view = result.props.children[0];

    const del = view.props.children[6];
    del.type.should.equal('button');
    del.props.style.should.be.a('object')
      .that.has.property('display')
      .that.is.a('string')
      .that.equals('none');
    del.props.onClick.should.be.a('function')
      .that.eqls(onShowDelete);
    del.props.children.should.be.a('string')
      .that.equals('Delete');

    const confirmDel = view.props.children[7];
    confirmDel.type.should.equal(Link);
    confirmDel.props.to.should.be.a('string')
      .that.equals('/main');
    confirmDel.props.style.should.be.a('object')
      .that.eqls({});
    confirmDel.props.children.type.should.equal('button');
    confirmDel.props.children.props.children.should.be.a('string')
      .that.equals('Confirm');

    const cancelDel = view.props.children[8];
    cancelDel.type.should.equal('button');
    cancelDel.props.style.should.be.a('object')
      .that.eqls({});
    cancelDel.props.onClick.should.be.a('function')
      .that.eqls(onShowDelete);
    cancelDel.props.children.should.be.a('string')
      .that.equals('Cancel');
  });
});
