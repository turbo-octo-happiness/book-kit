import React, { PropTypes as T } from 'react'
import {login, logout} from '../redux/actions'
import { connect } from 'react-redux'
import Auth from './login'

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleLoginClick() {
  this.props.login()
}

handleLogoutClick() {
  this.props.logout()
}

  render() {
    const { allJedis, singleJedi, error, isAuthenticated, profile } = this.props
    return (
      <div>
      <Auth
  isAuthenticated={isAuthenticated}
  profile={profile}
  onLoginClick={this.handleLoginClick}
  onLogoutClick={this.handleLogoutClick}
/>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated, profile } = auth
  return {
    isAuthenticated,
    profile
  }
}

export default connect(mapStateToProps, {
  login,
  logout
})(Container)

// export default Container;
