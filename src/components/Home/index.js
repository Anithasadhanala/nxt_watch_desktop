import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Premium from '../Premium'
import SearchItem from '../SearchItem'
import MobileSidebar from '../MobileSidebar'
import SideBar from '../SideBar'
import './index.css'

class Home extends Component {
  state = {search: '', homeList: [], status: 'Loading', premium: true}

  searchInputChanged = event => {
    this.setState({search: event.target.value})
  }

  componentDidMount = () => {
    this.homeGetApiCalled()
  }

  onFailureHomeApi = () => {
    this.setState({status: 'Failure'})
  }

  onSuccessHomeApi = data => {
    const cleanedData = data.map(each => ({
      id: each.id,
      title: each.title,
      name: each.channel.name,
      publish: each.published_at,
      viewCount: each.view_count,
      thumbNail: each.thumbnail_url,
      profileImg: each.channel.profile_image_url,
    }))

    this.setState({homeList: cleanedData, status: 'Success'})
  }

  homeGetApiCalled = async () => {
    this.setState({status: 'Loading'})

    const {search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSuccessHomeApi(data.videos)
    } else {
      this.onFailureHomeApi()
    }
  }

  retryBtnCliked = () => {
    this.homeGetApiCalled()
  }

  searchBtnClicked = () => {
    this.homeGetApiCalled()
  }

  isLoadingFunctionCalled = () => (
    <div className="loader-container hi" data-testid="loader">
      <Loader type="ThreeDots" color="#0f0f0f" height="50" width="50" />
    </div>
  )

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
    const {homeList} = this.state
    const listLength = homeList.length

    return (
      <>
        {listLength === 0 ? (
          <div className="SthWrongContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
              alt="no videos"
              className="sthWrongImg"
            />
            <h1 className="sthWrongHead">No Search results found</h1>
            <p className="sthWrongPara">
              Try different key words or remove search filter.
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
        ) : (
          <div className=" searchItemContainer">
            {homeList.map(each => (
              <SearchItem key={each.id} details={each} />
            ))}
          </div>
        )}
      </>
    )
  }

  premiumClicked = () => {
    this.setState({premium: false})
  }

  isKeyEntered = event => {
    if (event.code === 'Enter') this.homeGetApiCalled()
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
    const {premium} = this.state
    return (
      <>
        <Header />
        <div className="HomeBody">
          <SideBar details="Home" />
          <div className="HomeBodySubContainer">
            {premium ? (
              <Premium
                premiumClicked={this.premiumClicked}
                data-testid="banner"
              />
            ) : null}

            <div className="HomeBodySubContainer2">
              <div className="HomeSearchContainer">
                <input
                  type="search"
                  placeholder="Search"
                  className="searchInput"
                  onChange={this.searchInputChanged}
                  onKeyDown={this.isKeyEntered}
                />
                <button
                  className="searchBtn"
                  type="button"
                  onClick={this.searchBtnClicked}
                  data-testid="searchButton"
                >
                  <BiSearch />
                </button>
              </div>

              {this.switchCaseFunctionCalled()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
