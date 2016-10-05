import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import Navbar from '../../public/js/nav/nav-header';
import { Link } from 'react-router';

const should = chai.should();

describe('Navbar component', () => {
  it('Renders Navbar with Login button if not authenticated', () => {
    /* ------- MOCK DATA ------- */
    const isAuthenticated = false;

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Navbar
        isAuthenticated={isAuthenticated}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('header');

    const nav = result.props.children;
    nav.type.should.equal('nav');
    nav.props.children.length.should.equal(2);

    const link = nav.props.children[0];
    link.type.should.equal(Link);
    link.props.to.should.equal('/main');
    link.props.className.should.equal('main-logo');
    link.props.style.should.be.a('object');
    link.props.style.should.eql({});
    link.props.children.type.should.equal('img');
    link.props.children.props.src.should.equal('img/logo.png');
    link.props.children.props.alt.should.equal('Book Kit!');

    const login = nav.props.children[1];
    login.type.should.equal('div');
    login.props.className.should.equal('login');
    login.props.children.type.should.equal(Link);
    login.props.children.props.to.should.equal('#');
    login.props.children.props.children.should.equal('Login');
    login.props.children.props.style.should.be.a('object');
    login.props.children.props.style.should.eql({});
  });

  it('Renders Navbar with profile pic, account button, and logout button', () => {
    /* ------- MOCK DATA ------- */
    const isAuthenticated = true;
    const profile = {
      picture: 'imageurl'
    };

    const onLogoutClick = () => {
      // Test Function
    };

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Navbar
        isAuthenticated={isAuthenticated}
        profile={profile}
        onLogoutClick={onLogoutClick}
      />
    );
    const result = renderer.getRenderOutput();
    console.log(result.props.children.props.children[1].props.children[2], '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('header');

    const nav = result.props.children;
    nav.type.should.equal('nav');
    nav.props.children.length.should.equal(2);

    const link = nav.props.children[0];
    link.type.should.equal(Link);
    link.props.to.should.equal('/main');
    link.props.className.should.equal('main-logo');
    link.props.style.should.be.a('object');
    link.props.style.should.eql({});
    link.props.children.type.should.equal('img');
    link.props.children.props.src.should.equal('img/logo.png');
    link.props.children.props.alt.should.equal('Book Kit!');

    const account = nav.props.children[1];
    account.type.should.equal('div');
    account.props.children.length.should.equal(3);

    const profileLink = account.props.children[0];
    profileLink.type.should.equal(Link);
    profileLink.props.to.should.equal('/manage/profile');
    profileLink.props.className.should.equal('prof-link');
    profileLink.props.style.should.be.a('object');
    profileLink.props.style.should.eql({});
    profileLink.props.children.type.should.equal('img');
    profileLink.props.children.props.src.should.equal('imageurl');
    profileLink.props.children.props.height.should.equal('40px');
    profileLink.props.children.props.alt.should.equal('profile');
    profileLink.props.children.props.className.should.equal('prof-pic');

    const accountButton = account.props.children[1];
    accountButton.type.should.equal(Link);
    accountButton.props.to.should.equal('/manage/profile');
    accountButton.props.children.should.equal('My Account');
    accountButton.props.style.should.be.a('object');
    accountButton.props.style.should.eql({});

    const logout = account.props.children[2];
    logout.type.should.equal(Link);
    logout.props.to.should.equal('/');
    logout.props.onClick.should.be.a('function');
    logout.props.onClick.should.equal(onLogoutClick);
    logout.props.children.should.equal('Logout');
    logout.props.style.should.be.a('object');
    logout.props.style.should.eql({});
  });
});
