import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

const trendingApiConstants = {
  onSuccess: 'SUCCESS',
  onFailure: 'FAILED',
  inProgress: 'IN_PROGRESS',
  initial: 'INTIAL',
}

class Originals extends Component {
  state = {
    trendingData: [],
    isTrendingSuccess: trendingApiConstants.initial,
  }

  componentDidMount() {
    this.GetOriginalMovies()
  }

  GetOriginalMovies = async () => {
    this.setState({isTrendingSuccess: trendingApiConstants.inProgress})
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
        trendingData: updatedData,
        isTrendingSuccess: trendingApiConstants.onSuccess,
      })
    } else if (response.ok !== true) {
      this.setState({isTrendingSuccess: trendingApiConstants.onFailure})
    }
  }

  renderTrendingMovies = () => {
    const {isTrendingSuccess, trendingData} = this.state

    const settings = {
      dots: false,
      slidesToShow: 4,
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
          breakpoint: 700,
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
          <div className="original-slick-container">
            <Slider {...settings}>
              {trendingData.map(every => (
                <Link to={`/movies/${every.id}`} key={every.id}>
                  <div className="trending-movie">
                    <img
                      src={every.posterPath}
                      alt={every.name}
                      key={every.id}
                      className="trending-movie"
                    />
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        )
      case trendingApiConstants.onFailure:
        return (
          <div className="originals-failure">
            <img
              src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695825829/alert-triangle_ksyewu.png"
              alt="failure view"
              className="x-alert"
            />
            <p className="originals-para">
              Something went wrong. Please try again
            </p>
            <button
              type="button"
              className="try-again-originals"
              onClick={this.GetOriginalMovies}
            >
              Try Again
            </button>
          </div>
        )
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

  render() {
    return this.renderTrendingMovies()
  }
}

export default Originals
