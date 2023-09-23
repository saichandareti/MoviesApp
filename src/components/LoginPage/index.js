import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    nameInput: '',
    passwordInput: '',
    showError: false,
    errorMsg: '',
  }

  OnChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  OnChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  OnSubmitSuccess = jwtToken => {
    this.setState({nameInput: '', passwordInput: ''})
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    console.log(jwtToken)
    const {history} = this.props
    history.replace('/')
  }

  OnSubmitFailure = errorMsg => {
    this.setState({errorOccured: true, errorDetails: errorMsg})
  }

  LoginCreds = async event => {
    event.preventDefault()

    const {nameInput, passwordInput} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username: nameInput, password: passwordInput}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const jsonData = await response.json()

    if (response.ok === true) {
      this.OnSubmitSuccess(jsonData.jwt_token)
    } else {
      this.OnSubmitFailure(jsonData.error_msg)
    }
  }

  render() {
    const {showError, errorMsg} = this.state
    const display = showError ? (
      <p className="error-msg">{errorMsg}</p>
    ) : (
      <p className="error-msg"> </p>
    )
    return (
      <div className="bg-container">
        <img
          src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695201554/Group_7399_tj78al.png"
          alt="movies"
          className="movies-image"
        />
        <div className="login-container">
          <h1 className="login-heading">Login</h1>
          <div className="name-input-con">
            <label htmlFor="name-input" className="username">
              USERNAME
            </label>
            <input
              type="text"
              id="name-input"
              className="name-input"
              onChange={this.OnChangeNameInput}
            />
          </div>
          <div className="password-input-con">
            <label htmlFor="password-input" className="username">
              PASSWORD
            </label>
            <input
              type="password"
              id="password-input"
              className="name-input"
              onChange={this.OnChangePasswordInput}
            />
          </div>
          {display}
          <button
            type="button"
            className="login-button"
            onClick={this.LoginCreds}
          >
            Login
          </button>
        </div>
      </div>
    )
  }
}

export default LoginPage
