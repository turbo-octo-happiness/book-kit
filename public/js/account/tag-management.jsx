import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Tag from './tag';

class TagManagement extends React.Component {
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(tagId) {
    this.props.dispatch(actions.deleteTag(tagId, this.props.token))
  }

  render() {
    const tags = this.props.tags.map((tag, index) => {
      return (
        <Tag
          key={index}
          tag={tag}
          onDelete={this.onDelete}
          token={this.props.token}
        />
      )
    });

    return (
      <div>
        <h1>Tags</h1>
        {tags}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    tags: state.tags,
  };
}

module.exports = connect(mapStateToProps)(TagManagement);
