import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Tag from './tag';

const propTypes = {
  tags: PropTypes.array,
  dispatch: PropTypes.func,
  token: PropTypes.string,
};

class TagManagement extends React.Component {
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(tagId) {
    this.props.dispatch(actions.deleteTag(tagId, this.props.token));
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
    );
    });

    return (
      <ul className="content-section">
        <li>
          <h2 className="folder-header">Manage Tags:</h2>
        </li>
        {tags}
      </ul>
    );
  }
}

TagManagement.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    tags: state.tags,
  };
}

module.exports = connect(mapStateToProps)(TagManagement);
