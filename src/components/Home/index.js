import './index.css'
import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'

import Header from '../Header'
import ContactUs from '../ContactUs'

const apiConstants = {
  onSuccess: 'SUCCESS',
  onFailure: 'FAILED',
  inProgress: 'IN_PROGRESS',
  initial: 'INTIAL',
}

class Home extends Component {
  state = {
    trendingData: [],
    originalData: [],
    isTrendingSuccess: apiConstants.initial,
    isOriginalsSuccess: apiConstants.initial,
  }

  componentDidMount() {
    this.GetTrendingMovies()
    this.GetOriginalMovies()
  }

  GetTrendingMovies = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const details = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
      details,
    )
    const jsonData = await response.json()

    if (response.ok === true) {
      const updatedData = jsonData.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        trendingData: updatedData,
        isTrendingSuccess: apiConstants.onSuccess,
      })
    } else if (response.ok !== true) {
      this.setState({isTrendingSuccess: apiConstants.onFailure})
    }
  }

  GetOriginalMovies = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const details = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      details,
    )
    const jsonData = await response.json()
    console.log(jsonData)
    if (response.ok === true) {
      const updatedData = jsonData.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        originalData: updatedData,
        isOriginalSuccess: apiConstants.onSuccess,
      })
    } else if (response.ok !== true) {
      this.setState({isOriginalSuccess: apiConstants.onFailure})
    }
  }

  render() {
    const {trendingData, originalData} = this.state
    const settings = {
      dots: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="home-container">
        <div className="spider-con">
          <Header />
          <h1 className="super-man">Super Man</h1>
          <p className="super-para">
            Superman is a fictional superhero who first appeared in American
            comic books published by DC Comics.
          </p>
          <button type="button" className="play-button">
            Play
          </button>
        </div>
        <h1 className="trending">Trending Now</h1>
        <div className="slick-container">
          <Slider {...settings}>
            {trendingData.map(every => (
              <div className="trending-movie" key={every.id}>
                <img
                  src={every.posterPath}
                  alt={every.title}
                  key={every.id}
                  className="trending-movie"
                />
              </div>
            ))}
          </Slider>
        </div>
        <h1 className="trending">Originals</h1>
        <div className="slick-container">
          <Slider {...settings}>
            {originalData.map(every => (
              <div className="trending-movie" key={every.id}>
                <img
                  src={every.posterPath}
                  alt={every.title}
                  key={every.id}
                  className="trending-movie"
                />
              </div>
            ))}
          </Slider>
        </div>
        <ContactUs />
      </div>
    )
  }
}
export default Home
