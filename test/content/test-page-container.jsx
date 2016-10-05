import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import PageContainer from '../../public/js/content/page-container';

const should = chai.should();

describe('PageContainer component', () => {
  it('Renders section containing SidebarContainer component', () => {
    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <PageContainer />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('section');
    result.props.className.should.equal('main-section');
    result.props.children.type.should.equal('div');
    result.props.children.props.className.should.equal('main-container');

    const sidebar = result.props.children.props.children[0];
    sidebar.type.should.be.a('function');
    sidebar.type.displayName.should.equal('Connect(SidebarContainer)');
    sidebar.type.propTypes.should.have.property('store');
    sidebar.type.should.have.property('WrappedComponent')
      .that.is.a('function')
      .with.property('propTypes');
    sidebar.type.should.have.deep.property('WrappedComponent.propTypes.folders');
    sidebar.type.should.have.deep.property('WrappedComponent.propTypes.tags');
    sidebar.type.should.have.deep.property('WrappedComponent.propTypes.dispatch');
    sidebar.type.should.have.deep.property('WrappedComponent.propTypes.token');
  });
});
