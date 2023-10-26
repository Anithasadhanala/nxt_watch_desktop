import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillFire} from 'react-icons/ai'
import SingleItem from '../SingleItem'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

class Trending extends Component {
  state = {
    trendingList: [],
    status: 'Loading',
  }

  componentDidMount = () => {
    this.trendingItemsApiCalled()
  }

  onSuccessFetchApi = data => {
    const cleanedData = data.map(each => ({
      id: each.id,
      title: each.title,
      thumbNail: each.thumbnail_url,
      viewCount: each.view_count,
      publish: each.published_at,
    }))

    this.setState({trendingList: cleanedData, status: 'Success'})
  }

  onFailureFetchApi = () => {
    console.log('failure')
    this.setState({status: 'Failure'})
  }

  trendingItemsApiCalled = async () => {
    this.setState({status: 'Loading'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      mode: 'cors',
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
    this.trendingItemsApiCalled()
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
    const {trendingList} = this.state

    return (
      <>
        <div className="trendingNav" data-testid="trending">
          <AiFillFire className="trendingImg" />
          <h1 className="trendingHead">Trending</h1>
        </div>
        <div className="trendingItemContainerColumn">
          {trendingList.map(each => (
            <SingleItem key={each.id} details={each} status="true" />
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
          <SideBar details="Trending" />
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

export default Trending
