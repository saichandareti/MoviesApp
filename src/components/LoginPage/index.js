import {Component} from 'react'

import './index.css'

class LoginPage extends Component {
  render() {
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
            <input id="name-input" className="name-input" />
          </div>
          <div className="password-input-con">
            <label htmlFor="password-input" className="username">
              PASSWORD
            </label>
            <input id="password-input" className="name-input" />
          </div>
          <button type="button" className="login-button">
            Login
          </button>
        </div>
      </div>
    )
  }
}

export default LoginPage
