import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

export class Profile extends React.Component {

  render() {
    return(
      <div className="content-section profile">
        <img src={this.props.profile.picture} alt="Avatar" className="prof-pic" />
        <div className="prof-text">
          <div className="prof-labels">
            <h4>Name:</h4>
            <h4>Email:</h4>
            <h4>Github:</h4>
          </div>
          <div className="prof-user">
            <h4>{this.props.profile.name}</h4>
            <h4>{this.props.profile.email}</h4>
            <h4><a href={this.props.profile.html_url}>{this.props.profile.nickname}</a></h4>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
  };
}

export default connect(mapStateToProps)(Profile);
