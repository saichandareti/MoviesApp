import {Route, Switch} from 'react-router-dom'

import './App.css'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieDetails from './components/MovieDetails'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/" component={Home} />
    <Route exact path="/popular" component={Popular} />
    <Route exact path="/movies/:id" component={MovieDetails} />
  </Switch>
)

export default App
