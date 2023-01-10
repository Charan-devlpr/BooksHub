import './index.css'
import Loader from 'react-loader-spinner'

import {BsFillStarFill} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstance = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class BookDetails extends Component {
  state = {activeBookDetails: [], bookApi: apiStatusConstance.initial}

  componentDidMount = () => {
    this.getBookDetails()
  }

  onClickedTryAgain = () => {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({bookApi: apiStatusConstance.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books/${id}`,
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const formattedBooksList = {
        id: data.book_details.id,
        title: data.book_details.title,
        coverPic: data.book_details.cover_pic,
        authorName: data.book_details.author_name,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
      }
      this.setState({
        activeBookDetails: formattedBooksList,
        bookApi: apiStatusConstance.success,
      })
    } else {
      this.setState({bookApi: apiStatusConstance.failure})
    }
  }

  renderFailure = () => (
    <div className="something-went-wrong-container">
      <img
        src="https://res.cloudinary.com/dxqcmp4il/image/upload/v1672895138/Group_7522_2x_1_vxrika.png"
        alt="failure view"
        className="something-went-wrong-img"
      />
      <p className="try-again-content">
        Something went wrong, Please try again
      </p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onClickedTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderingSuccess = () => {
    const {activeBookDetails} = this.state
    const {
      title,
      coverPic,
      authorName,
      aboutAuthor,
      aboutBook,
      readStatus,
      rating,
    } = activeBookDetails
    return (
      <div className="book-details-container">
        <div className="book-details-card">
          <div className="book-details-container">
            <img
              src={coverPic}
              className="book-details-cover-pic"
              alt={title}
            />
            <div>
              <h1 className="book-details-book-heading">{title}</h1>
              <p className="book-details-author-name">{authorName}</p>
              <div className="container">
                <p className="book-details-avg-rating">Avg Rating</p>
                <BsFillStarFill className="book-details-star-icon" />
                <p className="book-details-rating">{rating}</p>
              </div>
              <div className="container">
                <p className="book-details-status">Status: </p>
                <p className="book-details-read-status">{readStatus}</p>
              </div>
            </div>
          </div>
          <hr className="line" />
          <h1 className="about-author-heading">About Author</h1>
          <p className="about-author-content">{aboutAuthor}</p>
          <h1 className="about-book-heading">About Book</h1>
          <p className="about-book-content">{aboutBook}</p>
        </div>
      </div>
    )
  }

  renderBooks() {
    const {bookApi} = this.state
    switch (bookApi) {
      case apiStatusConstance.inProgress:
        return this.renderLoading()
      case apiStatusConstance.success:
        return this.renderingSuccess()
      case apiStatusConstance.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderBooks()}
        <Footer />
      </div>
    )
  }
}

export default BookDetails
