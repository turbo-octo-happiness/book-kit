import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { Link } from 'react-router';
import NavHeader from '../../src/js/nav/nav-header';
import BookmarkFormContainer from '../../src/js/content/bookmark-form-container';

const should = chai.should();

describe('NavHeader - nav-header.jsx', () => {
  it('Should render the initial header', () => {
    const onAddInput = () => {
      // test function
    };

    const addFolder = () => {
      // test function
    };

    const folder = {
      folderid: 1,
      foldername: 'folderName',
    };

    const folders = [folder];

    const renderer = TestUtils.createRenderer();
    renderer.render(
      <NavHeader
        onAddInput={onAddInput}
        addFolder={addFolder}
        folders={folders}
      />
    );

    const result = renderer.getRenderOutput();
    result.type.should.equal('header');
    result.props.children.should.be.a('object');

    // <nav className="navbar navbar-default">
    const nav = result.props.children;
    nav.type.should.equal('nav');
    nav.props.className.should.equal('navbar navbar-default');
    nav.props.children.should.be.a('object');

    // <div className="container">
    const divContainer = nav.props.children;
    divContainer.type.should.equal('div');
    divContainer.props.className.should.equal('container');
    divContainer.props.children.should.be.a('array');
    divContainer.props.children.length.should.equal(3);

    // <ul className="nav navbar-nav">
    const ulLeftNav = divContainer.props.children[0];
    ulLeftNav.type.should.equal('ul');
    ulLeftNav.props.className.should.equal('nav navbar-nav');
    ulLeftNav.props.children.should.be.a('array');
    ulLeftNav.props.children.length.should.equal(2);

    // <li>
    const logo = ulLeftNav.props.children[0];
    logo.type.should.equal('li');
    logo.props.children.should.be.a('object');

    // <Link className="navbar-brand" to={'/'}>
    const logoLink = logo.props.children;
    logoLink.type.should.equal(Link);
    logoLink.props.className.should.equal('navbar-brand');
    logoLink.props.to.should.equal('/');
    logoLink.props.children.should.be.a('object');

    // <img src="logo.png" alt="Book Kit!" />
    const logoImg = logoLink.props.children;
    logoImg.type.should.equal('img');
    logoImg.props.src.should.equal('logo.png');
    logoImg.props.alt.should.equal('Book Kit!');

    // <li>
    const addBkmk = ulLeftNav.props.children[1];
    addBkmk.type.should.equal('li');
    addBkmk.props.children.should.be.a('array');
    addBkmk.props.children.length.should.equal(2);

    // <a data-toggle="modal" data-target="#add-form">
    const addModal = addBkmk.props.children[0];
    addModal.type.should.equal('a');
    addModal.props['data-toggle'].should.equal('modal');
    addModal.props['data-target'].should.equal('#add-form');
    addModal.props.children.should.be.a('object');

    // <span className="glyphicon glyphicon-plus" aria-hidden="true" />
    const addPlus = addModal.props.children;
    addPlus.type.should.equal('span');
    addPlus.props.className.should.equal('glyphicon glyphicon-plus');
    addPlus.props['aria-hidden'].should.equal('true');

    // <div className="modal fade" id="add-form">
    const divModal = addBkmk.props.children[1];
    divModal.type.should.equal('div');
    divModal.props.className.should.equal('modal fade');
    divModal.props.id.should.equal('add-form');
    divModal.props.children.should.be.a('object');

    // <BookmarkFormContainer />
    // const bookmarkContainer = divModal.props.children;
    // bookmarkContainer.should.equal(BookmarkFormContainer);

    const formRightNav = divContainer.props.children[1];
    formRightNav.type.should.equal('form');
    formRightNav.props.className.should.equal('navbar-form navbar-right');
    formRightNav.props.children.should.be.a('object');

    // formRightNav children

    const ulRightNav = divContainer.props.children[2];
    ulRightNav.type.should.equal('ul');
    ulRightNav.props.className.should.equal('nav navbar-nav navbar-right');
    ulRightNav.props.children.should.be.a('object');

    // ulRightNav children
  });
});
