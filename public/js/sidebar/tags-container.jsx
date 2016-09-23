import React from 'react';
import { connect } from 'react-redux';
import Tag from './tags';


class TagContainer extends React.Component {
  constructor() {
    super();
    this.getBookmarks = this.getBookmarks.bind(this);
  }

  componentDidMount() {
    // TODO: Dispatch action to retrieve all tags from database

  }

  getBookmarks(tagId) {
    // TODO: Dispatch action asking database for all bookmarks with associated with tagId
    
  }

  render() {
    let tagArray = [];

    this.props.tags.forEach((tag) => {
      tagArray.push(<Tag
        key={tag.id}
        name={tag.name}
        id={tag.id}
        getBookmarks={this.getBookmarks}
      />);
    });

    return (
      <div>
        <h2>Tags</h2>
        <ul>
          {tagArray}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tags: state.tags,
  };
}

module.exports = connect(mapStateToProps)(TagContainer);
