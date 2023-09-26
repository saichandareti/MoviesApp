import './index.css'
import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import ContactUs from '../ContactUs'

const trendingApiConstants = {
  onSuccess: 'SUCCESS',
  onFailure: 'FAILED',
  inProgress: 'IN_PROGRESS',
  initial: 'INTIAL',
}

const originalApiConstants = {
  onSuccess: 'SUCCESS',
  onFailure: 'FAILED',
  inProgress: 'IN_PROGRESS',
  initial: 'INTIAL',
}

class Home extends Component {
  state = {
    trendingData: [],
    originalData: [],
    isTrendingSuccess: trendingApiConstants.initial,
    isOriginalsSuccess: originalApiConstants.initial,
  }

  componentDidMount() {
    this.GetTrendingMovies()
    this.GetOriginalMovies()
  }

  GetTrendingMovies = async () => {
    this.setState({isTrendingSuccess: trendingApiConstants.inProgress})
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
        isTrendingSuccess: trendingApiConstants.onSuccess,
      })
    } else if (response.ok !== true) {
      this.setState({isTrendingSuccess: trendingApiConstants.onFailure})
    }
  }

  GetOriginalMovies = async () => {
    this.setState({isOriginalSuccess: originalApiConstants.inProgress})
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
    if (response.ok === true) {
      const updatedData = jsonData.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        isOriginalSuccess: originalApiConstants.onSuccess,
        originalData: updatedData,
      })
    } else if (response.ok !== true) {
      this.setState({isOriginalSuccess: originalApiConstants.onFailure})
    }
  }

  renderTrendingMovies = () => {
    const {isTrendingSuccess, trendingData} = this.state

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

    switch (isTrendingSuccess) {
      case trendingApiConstants.onSuccess:
        return (
          <div className="slick-container">
            <Slider {...settings}>
              {trendingData.map(every => (
                <div className="trending-movie" key={every.id}>
                  <Link to={`movies/${every.id}`}>
                    <img
                      src={every.posterPath}
                      alt={every.title}
                      key={every.id}
                      className="trending-movie"
                    />
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        )
      case trendingApiConstants.onFailure:
        return <div className="slick-container">No</div>
      case trendingApiConstants.inProgress:
        return (
          <div className="loader-container load-con" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        )

      default:
        return null
    }
  }

  renderOriginalMovies = () => {
    const {isOriginalsSuccess, originalData} = this.state
    console.log(isOriginalsSuccess)
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

    switch (isOriginalsSuccess) {
      case originalApiConstants.onSuccess:
        return (
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
        )
      case originalApiConstants.onFailure:
        return <div className="slick-container">No</div>
      case originalApiConstants.inProgress:
        return (
          <div className="loader-container load-con" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        )

      default:
        return null
    }
  }

  render() {
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
        {this.renderTrendingMovies()}
        <h1 className="trending">Originals</h1>
        {this.renderOriginalMovies()}
        <ContactUs />
      </div>
    )
  }
}
export default Home
