import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { AppContainer } from '../../public/js/app-container';
import SplashPage from '../../public/js/content/splash-page';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

describe('AppContainer component', () => {
  it('Renders the NavbarContainer and splash page if not authenticated', () => {
    /* ------- MOCK DATA ------- */
    const isAuthenticated = false;

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <AppContainer
        isAuthenticated={isAuthenticated}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result.props.children, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('div');
    result.props.children.length.should.equal(2);

    const navbar = result.props.children[0];
    navbar.type.should.be.a('function');
    navbar.type.should.have.property('propTypes');
    navbar.type.should.have.property('displayName')
      .that.equals('Connect(NavbarContainer)');
    navbar.type.should.have.property('WrappedComponent');
    navbar.type.should.have.deep.property('WrappedComponent.propTypes.dispatch');
    navbar.type.should.have.deep.property('WrappedComponent.propTypes.isAuthenticated');
    navbar.type.should.have.deep.property('WrappedComponent.propTypes.token');
    navbar.type.should.have.property('propTypes')
      .with.property('store');

    const splashPage = result.props.children[1];
    splashPage.type.should.equal(SplashPage);
  });

  it('Renders the NavbarContainer and children if authenticated', () => {
    /* ------- MOCK DATA ------- */
    const isAuthenticated = true;

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <AppContainer
        isAuthenticated={isAuthenticated}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result.props.children, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('div');

    const navbar = result.props.children[0];
    navbar.type.should.be.a('function');
    navbar.type.should.have.property('propTypes');
    navbar.type.should.have.property('displayName')
      .that.equals('Connect(NavbarContainer)');
    navbar.type.should.have.property('WrappedComponent');
    navbar.type.should.have.deep.property('WrappedComponent.propTypes.dispatch');
    navbar.type.should.have.deep.property('WrappedComponent.propTypes.isAuthenticated');
    navbar.type.should.have.deep.property('WrappedComponent.propTypes.token');
    navbar.type.should.have.property('propTypes')
      .with.property('store');
    // Test for props.children ??
  });
});
