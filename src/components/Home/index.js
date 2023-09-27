import './index.css'

import {withRouter} from 'react-router-dom'
import ContactUs from '../ContactUs'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'
import HomePoster from '../HomePoster'

const Home = () => (
  <div className="home-container">
    <HomePoster />
    <h1 className="trending">Trending Now</h1>
    <TrendingNow />
    <h1 className="trending">Originals</h1>
    <Originals />
    <ContactUs />
  </div>
)

export default withRouter(Home)
