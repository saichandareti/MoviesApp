import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Header from '../Header'
import ContactUs from '../ContactUs'

class MovieDetails extends Component {
  state = {movieDetails: [], similarMovies: [], spokenLanguages: [], genres: []}

  componentDidMount() {
    this.GetMovieDetails()
  }

  GetMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const jsonData = await response.json()
    const jsonMovie = jsonData.movie_details
    console.log(jsonMovie)
    if (response.ok === true) {
      const updatedData = {
        adult: jsonMovie.adult,
        backdropPath: jsonMovie.backdrop_path,
        budget: jsonMovie.budget,
        id: jsonMovie.id,
        overview: jsonMovie.overview,
        posterPath: jsonMovie.poster_path,
        releaseDate: jsonMovie.release_date,
        runtime: jsonMovie.runtime,
        title: jsonMovie.title,
        voteAverage: jsonMovie.vote_average,
        voteCount: jsonMovie.vote_count,
      }
      const similarMovies = jsonMovie.similar_movies.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))

      const spokenLanguages = jsonMovie.spoken_languages.map(each => ({
        englishName: each.english_name,
        id: each.id,
      }))

      this.setState({
        movieDetails: updatedData,
        similarMovies,
        spokenLanguages,
        genres: jsonMovie.genres,
      })
    }
  }

  render() {
    const {movieDetails, similarMovies, spokenLanguages, genres} = this.state
    const {
      adult,
      title,
      runtime,
      releaseDate,
      budget,
      posterPath,
      overview,
      voteAverage,
      voteCount,
    } = movieDetails

    const formattedMinutes = runtime % 60
    const formattedHours = Math.floor(runtime / 60)
    let year
    let fullDate
    if (releaseDate !== undefined) {
      const dateString = releaseDate.split('-')
      const dateObject = new Date(dateString[0], dateString[1], dateString[2])
      year = dateObject.getFullYear()
      fullDate = format(dateObject, 'do MMMM Y')
    }

    return (
      <div className="movie-details-con">
        <div
          className="avenger-con"
          style={{backgroundImage: `url(${posterPath})`}}
        >
          <Header />
          <h1 className="movie-item-name">{title}</h1>
          <div className="duration-con">
            <p className="movie-duration">
              {formattedHours}h {formattedMinutes}m
            </p>
            <p className="u-a-rating">U/A</p>
            <p className="movie-year">{year}</p>
          </div>
          <p className="super-para">{overview}</p>
          <button type="button" className="movie-play-button">
            Play
          </button>
        </div>
        <div className="movie-sub-details">
          <div className="genre-con">
            <h1 className="genre">Genres</h1>
            <ul className="genre-list">
              {genres.map(every => (
                <li className="genre-name" key={every.id}>
                  {every.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="genre-con">
            <h1 className="audio">Audio Available</h1>
            <ul className="genre-list">
              {spokenLanguages.map(each => (
                <li className="genre-name" key={each.id}>
                  {each.englishName}
                </li>
              ))}
            </ul>
          </div>
          <div className="genre-con">
            <h1 className="audio">Rating Count</h1>
            <p className="genre-name rating">{voteCount}</p>
            <h1 className="audio rating-top">Rating Average</h1>
            <p className="genre-name rating">{voteAverage}</p>
          </div>
          <div className="genre-con">
            <h1 className="audio">Budget</h1>
            <p className="genre-name rating">{budget}</p>
            <h1 className="audio rating-top">Release Date</h1>
            <p className="genre-name rating">{fullDate}</p>
          </div>
        </div>
        <h1 className="trending">More like this</h1>
        <ul className="similar-list">
          {similarMovies.map(each => (
            <li className="more-item" key={each.id}>
              <img
                src={each.posterPath}
                alt={each.title}
                className="more-movie"
              />
            </li>
          ))}
        </ul>

        <ContactUs />
      </div>
    )
  }
}
export default MovieDetails
