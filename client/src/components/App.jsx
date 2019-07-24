import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from './MainNavbar'
import Home from './pages/Home'
import List from './pages/List'
// import AddCountry from './pages/AddCountry'
import StreetArtDetail from './pages/StreetArtDetail'
import NewStreetArt from './pages/NewStreetArt'
import Secret from './pages/Secret'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/list" component={List} />
        <Route
          path="/streetart-detail/:streetArtId"
          component={StreetArtDetail}
        />
        <Route path="/signup" component={Signup} />
        <Route path="/new-street-arts" component={NewStreetArt} />
        <Route path="/login" component={Login} />
        <Route path="/secret" component={Secret} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
    </div>
  )
}
