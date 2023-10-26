import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import GameItem from '../GameItem'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

class Gaming extends Component {
  state = {
    gamingList: [],
    status: 'Loading',
  }

  componentDidMount = () => {
    this.gamingItemsApiCalled()
  }

  onSuccessFetchApi = data => {
    const cleanedData = data.map(each => ({
      id: each.id,
      title: each.title,
      thumbNail: each.thumbnail_url,
      viewCount: each.view_count,
    }))

    this.setState({gamingList: cleanedData, status: 'Success'})
  }

  onFailureFetchApi = () => {
    this.setState({status: 'Failure'})
  }

  gamingItemsApiCalled = async () => {
    this.setState({status: 'Loading'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      this.onSuccessFetchApi(data.videos)
    } else {
      this.onFailureFetchApi()
    }
  }

  isLoadingFunctionCalled = () => (
    <div className="loader-container hi" data-testid="loader">
      <Loader type="ThreeDots" color="#0f0f0f" height="50" width="50" />
    </div>
  )

  retryBtnCliked = () => {
    this.gamingItemsApiCalled()
  }

  isFailureFunctionCalled = () => (
    <div className="SthWrongContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt=""
        className="sthWrongImg"
      />
      <h1 className="sthWrongHead">Oops! Something Went Wrong</h1>
      <p className="sthWrongPara">
        We are having some trouble to complete your request. Please try again.
      </p>
      <div>
        <button
          className="sthWrongBtn"
          type="button"
          onClick={this.retryBtnCliked}
        >
          Retry
        </button>
      </div>
    </div>
  )

  isSuccessfulFunctionCalled = () => {
    const {gamingList} = this.state
    return (
      <>
        <div className="trendingNav" data-testid="gaming">
          <SiYoutubegaming className="trendingImg" />
          <h1 className="trendingHead">Gaming</h1>
        </div>
        <div className="gamingSingleContainer">
          {gamingList.map(each => (
            <GameItem key={each.id} details={each} />
          ))}
        </div>
      </>
    )
  }

  switchCaseFunctionCalled = () => {
    const {status} = this.state
    switch (status) {
      case 'Loading':
        return this.isLoadingFunctionCalled()
      case 'Success':
        return this.isSuccessfulFunctionCalled()
      case 'Failure':
        return this.isFailureFunctionCalled()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="HomeBody">
          <SideBar details="Gaming" />
          <div className="HomeBodySubContainer">
            <div className="trendingContainer">
              {this.switchCaseFunctionCalled()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Gaming
