import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submittingDetails = event => {
    event.preventDefault()
    this.gettingLogin()
  }

  gettingLogin = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.setState({showErrorMsg: true})
      this.submitFailure(data.error_msg)
    }
  }

  submitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  submitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div>
          <img
            scr="https://res.cloudinary.com/dxqcmp4il/image/upload/v1672912250/Rectangle_1467_2x_1_kysey8.png"
            alt="website login"
            className="login-img"
          />
        </div>
        <form className="form-container" onSubmit={this.submittingDetails}>
          <div className="container">
            <img
              src="https://res.cloudinary.com/dxqcmp4il/image/upload/v1672811169/Group_7730_2x_1_xsumg4.png"
              alt="login website logo"
              className="website-logo"
            />
            <h1 className="bookHub-text">ookHub</h1>
          </div>
          <div className="input-container">
            <label htmlFor="username">Username*</label>
            <input
              type="text"
              id="username"
              onChange={this.onChangeUsername}
              value={username}
              className="input"
              placeholder="USERNAME"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              onChange={this.onChangePassword}
              value={password}
              className="input"
              placeholder="PASSWORD"
            />
            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
