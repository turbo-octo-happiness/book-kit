import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import Tag from '../../public/js/sidebar/tags';
import { Link } from 'react-router';

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

/* ------- MOCK DATA ------- */
const tagid = 'tagId';
const tagname = 'tagName';

describe('Tag Component', () => {
  it('Renders a tag icon and name linking to it\'s tag route', () => {
    /* ------ TEST RENDER ------ */
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Tag
        tagname={tagname}
        tagid={tagid}
      />
    );
    const result = renderer.getRenderOutput();
    // console.log(result, '<<< RESULT');

    /* ------- TESTS -------- */
    result.type.should.equal('li');
    result.props.children.type.should.equal('div');

    const tagLink = result.props.children.props.children;
    tagLink.type.should.equal(Link);
    tagLink.props.to.should.be.a('string')
        .that.equals('/tagId');
    tagLink.props.children.should.have.length(2);

    const tagIcon = tagLink.props.children[0];
    tagIcon.type.should.equal('i');
    tagIcon.props.className.should.equal('fa fa-tag');

    const tagName = tagLink.props.children[1];
    tagName.type.should.equal('span');
    tagName.props.children.should.be.a('string')
      .that.equals('tagName');
  });
});
