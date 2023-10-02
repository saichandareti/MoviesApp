import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

const originalApiConstants = {
  onSuccess: 'SUCCESS',
  onFailure: 'FAILED',
  inProgress: 'IN_PROGRESS',
  initial: 'INTIAL',
}

class Originals extends Component {
  state = {
    trendingData: [],
    isTrendingSuccess: originalApiConstants.initial,
  }

  componentDidMount() {
    this.GetOriginalMovies()
  }

  GetOriginalMovies = async () => {
    this.setState({isTrendingSuccess: originalApiConstants.inProgress})
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

    if (response.ok === true) {
      const jsonData = await response.json()

      const updatedData = jsonData.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        trendingData: updatedData,
        isTrendingSuccess: originalApiConstants.onSuccess,
      })
    } else if (response.ok !== true) {
      this.setState({isTrendingSuccess: originalApiConstants.onFailure})
    }
  }

  renderOriginalMovies = () => {
    const {isTrendingSuccess, trendingData} = this.state

    const settings = {
      dots: false,
      slidesToShow: 4,
      speed: 500,
      slidesToScroll: 1,
      infinite: false,
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
      case originalApiConstants.onSuccess:
        return (
          <div className="original-slick-container">
            <Slider {...settings}>
              {trendingData.map(every => (
                <Link to={`/movies/${every.id}`} key={every.id}>
                  <div className="original-movie">
                    <img
                      src={every.posterPath}
                      alt={every.name}
                      key={every.id}
                      className="original-movie"
                    />
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        )
      case originalApiConstants.onFailure:
        return (
          <div className="originals-failure">
            <img
              src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695825829/alert-triangle_ksyewu.png"
              alt="failure view"
              className="original-x-alert"
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
    return this.renderOriginalMovies()
  }
}

export default Originals
