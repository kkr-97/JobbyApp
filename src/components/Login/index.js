import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    usernameInp: '',
    passwordInp: '',
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({usernameInp: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInp: event.target.value})
  }

  onSuccessfulSubmit = jwtToken => {
    Cookie.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onFailureSubmit = errorMsg => {
    this.setState({errorMsg})
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {usernameInp, passwordInp} = this.state
    const userDetails = {
      username: usernameInp,
      password: passwordInp,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessfulSubmit(data.jwt_token)
    } else {
      this.onFailureSubmit(data.error_msg)
    }
  }

  render() {
    const token = Cookie.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    const {usernameInp, passwordInp, errorMsg} = this.state
    return (
      <div className="login-bg-out-container">
        <form onSubmit={this.onClickSubmit} className="login-bg-in-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo-img"
          />
          <div className="input-container">
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              type="text"
              className="input-box"
              placeholder="Username"
              value={usernameInp}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              className="input-box"
              placeholder="Password"
              value={passwordInp}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
          {errorMsg !== '' ? <p className="error-msg">*{errorMsg}</p> : null}
        </form>
      </div>
    )
  }
}
export default Login
