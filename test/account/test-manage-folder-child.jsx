import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import Folder from '../../public/js/account/manage-folder-child';


process.env.DEVELOPMENT = 'testing';

const should = chai.should();

describe('ManageFolders Component', () => {
  it('Renders folder name with edit, delete, and share buttons when showShare and show are false', () => {
    /* ------- MOCK DATA ------- */
    const folder = {
      folderid: 4,
      foldername: 'folderName',
      members: ['someguy@somewhere.com'],
    };
    const showShare = false;
    const show = false;

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Folder
        folder={folder}
        show={show}
        showShare={showShare}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result.props.children[1], '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('li');
    result.props.className.should.equal('manage-folder-container');
    result.props.children.should.have.length(2);
    result.props.children[0].type.should.equal('div');
    result.props.children[0].props.className.should.equal('manage-folder');
    result.props.children[0].props.children.should.have.length[3];

    const folderName = result.props.children[0].props.children[0];
    folderName.type.should.equal('h3');
    folderName.props.style.should.be.a('object')
      .that.eqls({});
    folderName.props.children.should.be.a('string')
      .that.equals('folderName');

    const form = result.props.children[0].props.children[1];
    form.type.should.equal('form');
    form.props.onSubmit.should.be.a('function');
    form.props.style.should.have.property('display')
      .that.is.a('string')
      .that.equals('none');
    form.props.children.type.should.equal('input');
    form.props.children.ref.should.be.a('function');
    form.props.children.props.type.should.equal('text');
    form.props.children.props.defaultValue.should.equal('folderName');

    const buttons = result.props.children[0].props.children[2];
    buttons.type.should.equal('div');
    buttons.props.className.should.equal('manage-buttons');
    buttons.props.children.should.have.length(4);

    const editButton = buttons.props.children[1];
    editButton.type.should.equals('button');
    editButton.props.disabled.should.be.a('boolean');
    editButton.props.children.should.be.a('string')
      .that.equals('Edit');

    const deleteButton = buttons.props.children[2];
    deleteButton.type.should.equal('button');
    deleteButton.props.onClick.should.be.a('function')
    deleteButton.props.children.should.be.a('string')
      .that.equals('Delete');

    const shareButton = buttons.props.children[3];
    shareButton.type.should.equal('button');
    shareButton.props.children.should.be.a('string')
      .that.equals('Share');
  });

  it('Renders text inputs for folder name and email when show and showShare states are true', () => {
    /* ------- MOCK DATA ------- */
    const folder = {
      folderid: 4,
      foldername: 'folderName',
      members: ['someguy@somewhere.com'],
    };
    const showShare = true;
    const show = true;

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Folder
        folder={folder}
        show={show}
        showShare={showShare}
      />
    );
    const result = renderer.getRenderOutput();
    console.log(result.props.children[0].props.children[2].props.children[0].props, '<<< RESULT');

    /* ------- TESTS -------- */
    const folderName = result.props.children[0].props.children[0];
    folderName.type.should.equal('h3');
    folderName.props.style.should.be.a('object')
      .that.has.property('display')
      .that.is.a('string')
      .that.equals('none');
    folderName.props.children.should.be.a('string')
      .that.equals('folderName');

    const form = result.props.children[0].props.children[1];
    form.type.should.equal('form');
    form.props.onSubmit.should.be.a('function');
    form.props.style.should.be.a('object')
      .that.eqls({});
    form.props.onSubmit.should.be.a('function');
    form.props.children.type.should.equal('input');
    form.props.children.ref.should.be.a('function');
    form.props.children.props.type.should.equal('text');
    form.props.children.props.defaultValue.should.equal('folderName');

    const buttons = result.props.children[0].props.children[2];
    const shareForm = buttons.props.children[0];
    shareForm.type.should.equal('form');
    shareForm.props.onSubmit.should.be.a('function');
    shareForm.props.style.should.be.a('object')
      .that.eqls({});
    shareForm.props.children.type.should.equal('input');
    shareForm.props.children.ref.should.be.a('function')
    shareForm.props.children.props.type.should.equal('text');
    shareForm.props.children.props.placeholder.should.be.a('string')
      .that.equals('Add email address...');
  });
});
