import './index.css'
import {Component} from 'react'
import Header from '../Header'
import ContactUs from '../ContactUs'

class Popular extends Component {
  state = {popularData: []}

  componentDidMount() {
    this.GetPopularMovies()
  }

  GetPopularMovies = async () => {
    const details = {
      method: 'GET',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9.nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      details,
    )
    const jsonData = await response.json()
    console.log(jsonData)
    const updatedData = jsonData.results.map(each => ({
      id: each.id,
      backdropPath: each.backdrop_path,
      posterPath: each.poster_path,
      title: each.title,
    }))
    this.setState({
      popularData: updatedData,
    })
  }

  render() {
    const {popularData} = this.state

    return (
      <div className="popular-movies-con">
        <Header />
        <ul className="popular-list">
          {popularData.map(every => (
            <li className="popular-item" key={every.id}>
              <img
                src={every.posterPath}
                alt={every.title}
                key={every.id}
                className="popular-movie"
              />
            </li>
          ))}
        </ul>
        <ContactUs />
      </div>
    )
  }
}

export default Popular
