import React from 'react';
import chai from 'chai';
import TestUtils from 'react-addons-test-utils';
import { Provider, connect } from 'react-redux';
import store from '../../src/js/redux/store';
import NavFolderContainer from '../../src/js/nav/nav-folder-container';
import NavFolder from '../../src/js/nav/nav-folder';

const should = chai.should();

// FIXME: make this work

// describe('NavFolderContainer', () => {
//   it('Should render the NavFolder component', () => {
//     const renderer = TestUtils.createRenderer();
//     renderer.render(
//       <Provider store={store}>
//         <NavFolderContainer />
//       </Provider>
//     );
//
//     const result = renderer.getRenderOutput();
//
//     result.type.should.eql(connect);
//   });
// });
