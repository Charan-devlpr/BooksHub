import Slider from 'react-slick'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import SliderItems from '../SliderItems'

import './index.css'

const apiStatusConstance = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    booksList: [],
    bookApi: apiStatusConstance.initial,
  }

  componentDidMount = () => {
    this.getTopRatedBooks()
  }

  onClickedTryAgain = () => {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({bookApi: apiStatusConstance.inProgress})
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedBooksList = data.books.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        coverPic: eachBook.cover_pic,
        authorName: eachBook.author_name,
      }))
      this.setState({
        booksList: formattedBooksList,
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

  renderingBooksSuccess = () => {
    const {booksList} = this.state
    const settings = {
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <Slider {...settings}>
        <ul>
          <li>
            {booksList.map(eachBook => (
              <SliderItems sliderItemDetails={eachBook} key={eachBook.id} />
            ))}
          </li>
        </ul>
      </Slider>
    )
  }

  renderingBooks = () => {
    const {bookApi} = this.state
    switch (bookApi) {
      case apiStatusConstance.inProgress:
        return this.renderLoading()
      case apiStatusConstance.success:
        return this.renderingBooksSuccess()
      case apiStatusConstance.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-container">
        <Header />
        <div className="home-text-container">
          <h1 className="home-main-heading">Find Your Next Favorite Books?</h1>
          <p className="home-content">
            You are in the right place.tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations
          </p>
        </div>
        <div className="carousel-container">
          <div className="carousel-header">
            <h1 className="carousel-heading">Top Rated Books</h1>
            <Link to="/bookshelves">
              <button className="find-books" type="button">
                Find Books
              </button>
            </Link>
          </div>
          {this.renderingBooks()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
