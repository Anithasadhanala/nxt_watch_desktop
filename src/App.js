import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import SavedItemsContext from './context/SavedItemsContext'
import Home from './components/Home'
import Gaming from './components/Gaming'
import Login from './components/Login'
import Trending from './components/Trending'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {
    savedItemsList: [],
  }

  addSavedItems = data => {
    this.setState(prevState => ({
      savedItemsList: [...prevState.savedItemsList, data],
    }))
  }

  deleteSavedItem = data => {
    const {savedItemsList} = this.state
    const filtered = savedItemsList.filter(each => each.id === data)

    this.setState({savedItemsList: filtered})
  }

  render() {
    const {savedItemsList} = this.state

    return (
      <BrowserRouter>
        <SavedItemsContext.Provider
          value={{
            savedItemsList,
            addSavedItems: this.addSavedItems,
            deleteSavedItem: this.deleteSavedItem,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </SavedItemsContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
