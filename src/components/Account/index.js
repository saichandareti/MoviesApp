import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import ContactUs from '../ContactUs'

class Account extends Component {
  OnLogout = () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const {history} = this.props
      Cookies.remove('jwt_token')
      history.replace('/login')
    }
  }

  render() {
    return (
      <div className="popular-movies-con">
        <Header />
        <div className="account-container">
          <h1 className="account-heading">Account</h1>
          <hr className="rule" />
          <div className="member-ship">
            <h1 className="member-heading">Member ship</h1>
            <div className="gmail-password">
              <h1 className="gmail-heading">rahul@gmail.com</h1>
              <h1 className="password-heading">Password : ************</h1>
            </div>
          </div>
          <hr className="rule" />
          <div className="member-ship">
            <h1 className="member-heading">Plan details</h1>
            <h1 className="premium">Premium</h1>
            <h1 className="ultra-hd">Ultra HD</h1>
          </div>
          <hr className="rule" />
          <button
            type="button"
            className="logout-button"
            onClick={this.OnLogout}
          >
            Logout
          </button>
        </div>

        <ContactUs />
      </div>
    )
  }
}

export default Account
