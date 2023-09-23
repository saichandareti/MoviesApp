import {Route, Switch} from 'react-router-dom'

import './App.css'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Popular from './components/Popular'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/" component={Home} />
    <Route exact path="/popular" component={Popular} />
  </Switch>
)

export default App
