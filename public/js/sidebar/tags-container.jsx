import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Tag from './tags';

const propTypes = {
  tags: PropTypes.array,
};

class TagContainer extends React.Component {
  render() {
    console.log(this.props.tags, '<===tags state in tagcontainer');
    const tagArray = [];

    this.props.tags.forEach((tag) => {
      tagArray.push(<Tag
        key={tag.id}
        tag={tag.tag}
        id={tag.id}
      />);
    });

    return (
      <div>
        <ul>
          {tagArray}
        </ul>
      </div>
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
