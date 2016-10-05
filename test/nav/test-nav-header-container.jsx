import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { NavbarContainer } from '../../public/js/nav/nav-header-container';

const should = chai.should();

describe('NavbarContainer component', () => {
  it('Renders Navbar component ', () => {
    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <NavbarContainer />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.be.a('function');
  });
  it('Passes props to Navbar component', () => {
    /* ------- MOCK DATA ------- */
    const profile = {
      picture: 'imageurl',
    };
    const isAuthenticated = true || false;

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <NavbarContainer
        profile={profile}
        isAuthenticated={isAuthenticated}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.props.onLogoutClick.should.be.a('function');
    result.props.profile.should.be.a('object');
    result.props.profile.picture.should.equal('imageurl');
    result.props.isAuthenticated.should.be.a('boolean');
    result.props.getProfile.should.be.a('function');
  })
});
