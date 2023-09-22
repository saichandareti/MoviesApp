import './index.css'
import {Component} from 'react'
import Header from '../Header'

class Home extends Component {
  state = {}

  render() {
    return (
      <div className="home-container">
        <div className="spider-con">
          <Header />
        </div>
      </div>
    )
  }
}
export default Home
