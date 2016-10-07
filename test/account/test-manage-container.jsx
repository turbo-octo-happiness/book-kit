import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import ManageContainer from '../../public/js/account/manage-container';
import ManageSidebar from '../../public/js/account/manage-sidebar';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

describe('ManageContainer Component', () => {
  it('Renders ManageSidebar component and children', () => {

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <ManageContainer />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('section');
    result.props.className.should.equal('main-section container');
    result.props.children.type.should.equal('div');
    result.props.children.props.className.should.equal('main-container');
    result.props.children.props.children[0].type.should.equal(ManageSidebar);
  });
});
