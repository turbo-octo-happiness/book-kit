import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

class Tag extends React.Component {
  constructor() {
    super();
    this.onShowEdit = this.onShowEdit.bind(this);
    this.editTag = this.editTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.state = {
      show: false,
    };
  }

  onShowEdit() {
    this.setState({
      show: !this.state.show,
    });
  }

  editTag(event, tagId, tagName) {
    event.preventDefault();
    this.props.dispatch(actions.editTag(
      this.props.tag.tagid,
      this.editedTag.value,
      this.props.token));
    this.onShowEdit();
  }

  deleteTag(tagId) {
    this.props.onDelete(this.props.tag.tagid);
  }

  render() {
    const textStyle = this.state.show ? { display: 'none' } : {};
    const inputStyle = this.state.show ? {} : { display: 'none' };
    return (
        <li className="manage-folder">
          <h3 style={textStyle}>{this.props.tag.tagname}</h3>
          <form
            onSubmit={this.editTag}
            style={inputStyle}
          >
            <input
              type="text"
              ref={editedTag => { this.editedTag = editedTag; }}
              defaultValue={this.props.tag.tagname}
            />
          </form>
          <div className="manage-buttons">
            <button
              onClick={this.onShowEdit}
              aria-hidden="true"
            >Edit
            </button>
            <button
              onClick={this.deleteTag}
            >Delete
            </button>
          </div>
        </li>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

module.exports = connect(mapStateToProps)(Tag);
