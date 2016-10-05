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
    result.type.propTypes.should.have.property('onLogoutClick');
    result.type.propTypes.should.have.property('profile');
    result.type.propTypes.should.have.property('isAuthenticated');
    result.props.should.have.property('onLogoutClick')
      .that.is.a('function');
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
    result.type.should.be.a('function');
    result.type.propTypes.should.have.property('onLogoutClick');
    result.type.propTypes.should.have.property('profile');
    result.type.propTypes.should.have.property('isAuthenticated');
    result.props.should.have.property('onLogoutClick')
      .that.is.a('function');
    result.props.should.have.property('profile')
      .that.is.a('object')
      .with.property('picture')
      .that.equals('imageurl');
    result.props.should.have.property('isAuthenticated')
      .that.is.a('boolean');
    result.props.isAuthenticated.should.be.a('boolean')
      .that.equals(true);
    result.props.getProfile.should.be.a('function');
  })
});
