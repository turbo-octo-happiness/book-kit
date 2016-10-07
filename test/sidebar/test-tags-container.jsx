import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { TagContainer } from '../../public/js/sidebar/tags-container';
import Tag from '../../public/js/sidebar/tags';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

describe('TagsContainer Component', () => {
  it('Renders an array of individual Tag components, passing props', () => {
    /* ------- MOCK DATA ------- */
    const tag = {
      tagid: 'tagId',
      tagname: 'tagName',
    };
    const tags = [tag];

    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <TagContainer
        tags={tags}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('ul');
    result.props.children.should.be.a('array');
    result.props.children[0].type.should.equal(Tag);
    result.props.children[0].key.should.be.a('string')
      .that.equals('tagId');
    result.props.children[0].props.tagname.should.be.a('string')
      .that.equals('tagName');
    result.props.children[0].props.tagid.should.be.a('string')
      .that.equals('tagId');
  });
});
