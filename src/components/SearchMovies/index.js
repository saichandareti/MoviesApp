import './index.css'

import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const apiConstants = {
  onSuccess: 'SUCCESS',
  onFailure: 'FAILED',
  inProgress: 'IN_PROGRESS',
  initial: 'INTIAL',
}

class SearchMovies extends Component {
  state = {isSuccess: apiConstants.initial, searchInput: '', moviesData: []}

  componentDidMount() {
    this.GetSearchedMovies()
  }

  GetInput = event => {
    this.setState({searchInput: event.target.value})
  }

  GetSearchedMovies = async () => {
    this.setState({isSuccess: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const jsonData = await response.json()
    const resuArray = jsonData.results

    if (response.ok === true) {
      const updatedData = resuArray.map(each => ({
        id: each.id,
        title: each.title,
        posterPath: each.poster_path,
        backdropPath: each.backdrop_path,
      }))
      this.setState({
        moviesData: updatedData,
        isSuccess: apiConstants.onSuccess,
      })
    }
  }

  NoResults = () => {
    const {searchInput} = this.state
    return (
      <div className="no-res-con">
        <img
          src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695670878/nores_hoeqa4.png"
          alt="no results"
        />
        <p className="no-results-para">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderMovies = () => {
    const {isSuccess, moviesData} = this.state
    let checkData
    if (moviesData.length === 0) {
      checkData = this.NoResults()
    } else {
      checkData = (
        <ul className="popular-list">
          {moviesData.map(every => (
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
      )
    }
    switch (isSuccess) {
      case apiConstants.onSuccess:
        return checkData
      case apiConstants.onFailure:
        return 'K'
      case apiConstants.inProgress:
        return (
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        )

      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-container">
        <div className="header-container">
          <img
            src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695201554/Group_7399_tj78al.png"
            alt="movies"
            className="movies"
          />
          <p className="home-para">Home</p>
          <p className="popular-para">Popular</p>
          <div className="search-inp-con">
            <input
              type="text"
              className="search-element"
              onChange={this.GetInput}
            />
            <HiOutlineSearch
              className="search-icon-2"
              onClick={this.GetSearchedMovies}
            />
          </div>
          <img
            src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695374031/Mask_Group_zdn2jk.png"
            alt="avatar"
            className="avatar"
          />
        </div>
        {this.renderMovies()}
      </div>
    )
  }
}
export default SearchMovies
