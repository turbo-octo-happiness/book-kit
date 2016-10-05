import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { AppContainer } from '../../public/js/app-container';

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
    result.props.children[0].type.should.be.a('function');
    result.props.children[0].type.displayName.should.equal('Connect(NavbarContainer)');

    const splashPage = result.props.children[1];
    splashPage.type.should.equal('div');
    splashPage.props.className.should.equal('splash-page');
    // Test for splash page elements go here
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
    result.props.children[0].type.should.be.a('function');
    result.props.children[0].type.displayName.should.equal('Connect(NavbarContainer)');
    // Test for props.children ??
  });
});
