import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Tag from './tags';

const propTypes = {
  tags: PropTypes.array,
};

class TagContainer extends React.Component {
  render() {
    const tagArray = [];

    this.props.tags.forEach((tag) => {
      tagArray.push(<Tag
        key={tag.tagid}
        tagname={tag.tagname}
        tagid={tag.tagid}
      />);
    });

    return (
      <ul>
        {tagArray}
      </ul>
    );
  }
}

TagContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    tags: state.tags,
  };
}

module.exports = connect(mapStateToProps)(TagContainer);
