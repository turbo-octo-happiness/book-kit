import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import ManageSidebar from '../../public/js/account/manage-sidebar';
import { Link } from 'react-router';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

describe('ManageSidebar Component', () => {
  it('Renders links in sidebar to profile and folder/tag management', () => {

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <ManageSidebar />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('section');
    result.props.className.should.equal('sidebar');
    result.props.children.type.should.equal('ul');
    result.props.children.props.children.should.have.length(3);

    const profileLink = result.props.children.props.children[0];
    profileLink.type.should.equal('li');
    profileLink.props.children.type.should.equal(Link);
    profileLink.props.children.props.to.should.be.a('string')
      .that.equals('/manage/profile');
    profileLink.props.children.props.children.should.be.a('string')
      .that.equals('Profile');

    const foldersLink = result.props.children.props.children[1];
    foldersLink.type.should.equal('li');
    foldersLink.props.children.type.should.equal(Link);
    foldersLink.props.children.props.to.should.be.a('string')
      .that.equals('/manage/folders');
    foldersLink.props.children.props.children.should.be.a('string')
      .that.equals('Manage Folders');

    const tagsLink = result.props.children.props.children[2];
    tagsLink.type.should.equal('li');
    tagsLink.props.children.type.should.equal(Link);
    tagsLink.props.children.props.to.should.be.a('string')
      .that.equals('/manage/tags');
    tagsLink.props.children.props.children.should.be.a('string')
      .that.equals('Manage Tags');
  });
});
