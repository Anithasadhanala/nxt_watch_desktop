import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errStatus: '',
    errMsg: '',
    check: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = data => {
    this.setState({errStatus: true, errMsg: data})
  }

  loginAPICallPost = async () => {
    const url = 'https://apis.ccbp.in/login'

    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  formSubmitted = event => {
    event.preventDefault()
    this.loginAPICallPost()
  }

  checkBoxChecked = () => {
    this.setState(prevState => ({check: !prevState.check}))
  }

  usernameChanged = event => {
    this.setState({username: event.target.value})
  }

  passwordChanged = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errMsg, errStatus, check} = this.state
    const type = check ? 'text' : 'password'
    return (
      <div className="login-bgContainer">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="logo"
            className="login-logo"
          />
          <form className="login-form" onSubmit={this.formSubmitted}>
            <div className="login-form-div">
              <label className="login-label" htmlFor="username">
                USERNAME
              </label>
              <br />
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="input-login"
                onChange={this.usernameChanged}
                value={username}
              />
            </div>
            <div className="login-form-div">
              <label className="login-label" htmlFor="password">
                PASSWORD
              </label>
              <br />
              <input
                type={type}
                id="password"
                placeholder="Password"
                className="input-login"
                onChange={this.passwordChanged}
                value={password}
              />
            </div>
            <div className="login-showPassword">
              <input
                className="checkbox-password"
                type="checkbox"
                id="password-checkbox"
                onChange={this.checkBoxChecked}
              />
              <label className="showPassword-label" htmlFor="password-checkbox">
                Show Password
              </label>
            </div>
            <div>
              <button className="login-submitBtn" type="submit">
                Login
              </button>
            </div>
            {errStatus ? <p className="loginMsg">{errMsg}</p> : <></>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
