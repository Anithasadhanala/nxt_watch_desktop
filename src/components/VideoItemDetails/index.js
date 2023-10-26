import {Component} from 'react'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import {AiFillLike, AiFillDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import ReactPlayer from 'react-player'
import SavedItemsContext from '../../context/SavedItemsContext'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

class VideoItemDetails extends Component {
  state = {
    detailedData: {},
    like: false,
    unlike: false,
    save: false,
    status: 'Loading',
  }

  componentDidMount = () => {
    this.detailedVideoApiCalled()
  }

  likedBtnCliked = () => {
    this.setState(prevState => {
      if (prevState.like === false) {
        return {like: true, unlike: false}
      }
      return {like: false}
    })
  }

  unLikedBtnCliked = () => {
    this.setState(prevState => {
      if (prevState.unlike === false) {
        return {unlike: true, like: false}
      }
      return {unlike: false}
    })
  }

  onSuccessDetailedVideo = data => {
    const cleanedData = {
      id: data.id,
      title: data.title,
      videoUrl: data.video_url,
      thumbNail: data.thumbnail_url,
      viewCount: data.view_count,
      publish: data.published_at,
      description: data.description,
      name: data.channel.name,
      profile: data.channel.profile_image_url,
      subscribers: data.channel.subscriber_count,
    }

    this.setState({detailedData: cleanedData, status: 'Success'})
  }

  onFailureDetailedVideo = () => {
    this.setState({status: 'Failure'})
  }

  detailedVideoApiCalled = async () => {
    this.setState({status: 'Loading'})
    const {match} = this.props
    const {params} = match

    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSuccessDetailedVideo(data.video_details)
    } else {
      this.onFailureDetailedVideo()
    }
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
        alt="logo"
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

  retryBtnCliked = () => {
    this.detailedVideoApiCalled()
  }

  isSuccessfulFunctionCalled = () => {
    const {detailedData, like, unlike, save} = this.state
    const liked = like ? 'detailedViewBtn blueColor' : 'detailedViewBtn'
    const unliked = unlike ? 'detailedViewBtn blueColor' : 'detailedViewBtn'
    const saved = save ? 'detailedViewBtn blueColor' : 'detailedViewBtn'
    const likedImg = like ? 'detailedViewImg blueColor' : 'detailedViewImg'
    const unlikedImg = unlike ? 'detailedViewImg blueColor' : 'detailedViewImg'
    const publish = formatDistanceToNow(new Date(detailedData.publish)).slice(
      -8,
    )
    const savedImg = save ? 'detailedViewImg blueColor' : 'detailedViewImg'

    return (
      <SavedItemsContext.Consumer>
        {value => {
          const {addSavedItems, deleteSavedItem} = value

          const savedBtnClicked = () =>
            save === false
              ? addSavedItems(detailedData)
              : deleteSavedItem(detailedData)

          return (
            <>
              <div className="ji" data-testid="videoItemDetails">
                <ReactPlayer
                  url={detailedData.videoUrl}
                  className="video"
                  alt="video thumbnail"
                />

                <p className="detailedVideoHead">{detailedData.title}</p>
                <div className="detailedViewDataContainer">
                  <div className="detailedViewsDateSubContainer">
                    <p className="detailedPara">
                      {detailedData.viewCount} views
                    </p>
                    <p className="detailedPara">.</p>
                    <p className="detailedPara">{publish} ago</p>
                  </div>
                  <div className="detailedLikesDislikesCont">
                    <AiFillLike className={likedImg} />
                    <button
                      type="button"
                      onClick={this.likedBtnCliked}
                      className={liked}
                    >
                      Like
                    </button>

                    <AiFillDislike className={unlikedImg} />
                    <button
                      className={unliked}
                      type="button"
                      onClick={this.unLikedBtnCliked}
                    >
                      Dislike
                    </button>

                    <MdPlaylistAdd className={savedImg} />
                    <button
                      className={saved}
                      type="button"
                      onClick={savedBtnClicked}
                    >
                      Save
                    </button>
                  </div>
                </div>
                <hr className="detailedLine" />

                <div className="detailedChannelContainer">
                  <img
                    src={detailedData.profile}
                    alt="channel logo"
                    className="detailedChannelImg"
                  />
                  <div className="detailedChannelSubCont">
                    <p className="detailedChannelHead">{detailedData.name}</p>
                    <p className="detailedSubscribersPara">
                      {detailedData.subcribers} subscribers
                    </p>

                    <p className="detailedChannelLongPara">
                      {detailedData.description}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </SavedItemsContext.Consumer>
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
          <SideBar />
          <div className="HomeBodySubContainer">
            <div className="detailedVideoContainer">
              {this.switchCaseFunctionCalled()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default VideoItemDetails
