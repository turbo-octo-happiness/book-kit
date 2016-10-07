import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { Profile } from '../../public/js/account/profile';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

/* ------- MOCK DATA ------- */
const profile = {
  picture: 'profileImg',
  name: 'profileName',
  email: 'profileEmail',
  html_url: 'profileHtmlUrl',
  nickname: 'profileNickname',
};

describe('Profile Component', () => {
  it('Renders profile image and labels', () => {

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Profile
        profile={profile}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('div');
    result.props.className.should.equal('content-section profile');
    result.props.children.should.have.length(2);

    const profileImage = result.props.children[0];
    profileImage.type.should.equal('img');
    profileImage.props.src.should.equal('profileImg');
    profileImage.props.alt.should.equal('Avatar');
    profileImage.props.className.should.equal('prof-pic');

    const profileText = result.props.children[1];
    profileText.type.should.equal('div');
    profileText.props.className.should.equal('prof-text');
    profileText.props.children.should.have.length(2);

    const profileLabels = profileText.props.children[0];
    profileLabels.type.should.equal('div');
    profileLabels.props.className.should.equal('prof-labels');
    profileLabels.props.children.should.have.length(3);

    const nameLabel = profileLabels.props.children[0];
    nameLabel.type.should.equal('h4');
    nameLabel.props.children.should.be.a('string')
      .that.equals('Name:');

    const emailLabel = profileLabels.props.children[1];
    emailLabel.type.should.equal('h4');
    emailLabel.props.children.should.be.a('string')
      .that.equals('Email:');

    const githubLabel = profileLabels.props.children[2];
    githubLabel.type.should.equal('h4');
    githubLabel.props.children.should.be.a('string')
      .that.equals('Github:');
  });

  it('Renders users information in profile', () => {
    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Profile
        profile={profile}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    const profileUser = result.props.children[1].props.children[1];
    profileUser.type.should.equal('div');
    profileUser.props.className.should.equal('prof-user');
    profileUser.props.children.should.have.length(3);

    const profileName = profileUser.props.children[0];
    profileName.type.should.equal('h4');
    profileName.props.children.should.be.a('string')
      .that.equals('profileName');

    const profileEmail = profileUser.props.children[1];
    profileEmail.type.should.equal('h4');
    profileEmail.props.children.should.be.a('string')
      .that.equals('profileEmail');

    const profileGithub = profileUser.props.children[2];
    profileGithub.type.should.equal('h4');
    profileGithub.props.children.type.should.equal('a');
    profileGithub.props.children.props.href.should.be.a('string')
      .that.equals('profileHtmlUrl');
    profileGithub.props.children.props.children.should.be.a('string')
      .that.equals('profileNickname');
  });
});
