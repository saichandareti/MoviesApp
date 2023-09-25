import {Route, Switch} from 'react-router-dom'

import './App.css'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieDetails from './components/MovieDetails'
import SearchMovies from './components/SearchMovies'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/" component={Home} />
    <Route exact path="/popular" component={Popular} />
    <Route exact path="/movies/:id" component={MovieDetails} />
    <Route exact path="/search" component={SearchMovies} />
  </Switch>
)

export default App
