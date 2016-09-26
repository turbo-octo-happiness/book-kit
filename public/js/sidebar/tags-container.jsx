import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Tag from './tags';


class TagContainer extends React.Component {
  constructor() {
    super();
    this.findBookmarks = this.findBookmarks.bind(this);
  }

  componentDidMount() {
    // Dispatch action to retrieve ALL tags from database
    this.props.dispatch(actions.getTags());
  }

  findBookmarks(tag) {
    // Dispatch action asking for bookmarks associated with tagId
    this.props.dispatch(actions.findBookmarks(tag));
  }

  render() {
    let tagArray = [];

    this.props.tags.forEach((tag) => {
      tagArray.push(<Tag
        key={tag.id}
        name={tag.name}
        id={tag.id}
        findBookmarks={this.findBookmarks}
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
