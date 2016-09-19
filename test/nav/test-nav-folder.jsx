import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { Link } from 'react-router';
import NavFolder from '../../src/js/nav/nav-folder';

const should = chai.should();

describe('NavFolder - nav-folder.jsx', () => {
  it('Should render the initial NavFolder component', () => {
    const show = false;
    const folder = {
      foldername: 'folderName',
      folderid: 'folderId',
    };

    const onShowEdit = () => {
      // test function
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(
      <NavFolder
        show={show}
        folder={folder}
        onShowEdit={onShowEdit}
      />
    );

    const result = renderer.getRenderOutput();
    result.type.should.equal('li');
    result.props.children.length.should.equal(4);

    const link = result.props.children[0];
    link.type.should.equal(Link);
    link.props.to.should.equal('/folders/folderName');
    link.props.style.should.be.a('object');
    link.props.style.should.eql({});
    link.props.children.should.equal('folderName');

    const form = result.props.children[1];
    form.type.should.equal('form');
    form.props.onSubmit.should.be.a('function');
    form.props.style.should.be.a('object');
    form.props.style.should.eql({ display: 'none' });

    const input = form.props.children;
    input.type.should.equal('input');
    input.ref.should.be.a('function');
    input.props.defaultValue.should.equal('folderName');
    input.props.type.should.equal('text');

    const spanEdit = result.props.children[2];
    spanEdit.type.should.equal('span');
    spanEdit.props.onClick.should.be.a('function');
    spanEdit.props.className.should.equal('glyphicon glyphicon-pencil');
    spanEdit.props['aria-hidden'].should.equal('true');

    const spanDelete = result.props.children[3];
    spanDelete.type.should.equal('span');
    spanDelete.props.onClick.should.be.a('function');
    spanDelete.props.className.should.equal('glyphicon glyphicon-trash');
    spanDelete.props['aria-hidden'].should.equal('true');
  });
  it('Should display input field and hide Link when state.show is true', () => {
    const show = true;
    const folder = {
      foldername: 'folderName',
      folderid: 'folderId',
    };

    const onShowEdit = () => {
      // test function
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(
      <NavFolder
        show={show}
        folder={folder}
        onShowEdit={onShowEdit}
      />
    );

    const result = renderer.getRenderOutput();
    result.type.should.equal('li');
    result.props.children.length.should.equal(4);

    const link = result.props.children[0];
    link.type.should.equal(Link);
    link.props.to.should.equal('/folders/folderName');
    link.props.style.should.be.a('object');
    link.props.style.should.eql({ display: 'none' });
    link.props.children.should.equal('folderName');

    const form = result.props.children[1];
    form.type.should.equal('form');
    form.props.onSubmit.should.be.a('function');
    form.props.style.should.be.a('object');
    form.props.style.should.eql({});

    const input = form.props.children;
    input.type.should.equal('input');
    input.ref.should.be.a('function');
    input.props.defaultValue.should.equal('folderName');
    input.props.type.should.equal('text');

    const spanEdit = result.props.children[2];
    spanEdit.type.should.equal('span');
    spanEdit.props.onClick.should.be.a('function');
    spanEdit.props.className.should.equal('glyphicon glyphicon-pencil');
    spanEdit.props['aria-hidden'].should.equal('true');

    const spanDelete = result.props.children[3];
    spanDelete.type.should.equal('span');
    spanDelete.props.onClick.should.be.a('function');
    spanDelete.props.className.should.equal('glyphicon glyphicon-trash');
    spanDelete.props['aria-hidden'].should.equal('true');
  });
});
