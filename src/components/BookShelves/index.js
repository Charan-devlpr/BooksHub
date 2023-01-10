import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {Component} from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import Footer from '../Footer'
import Header from '../Header'
import Books from '../Books'

import BookShelvesList from '../BookShelvesList'

const initialBookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstance = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class BookShelves extends Component {
  state = {
    searchInput: '',
    bookshelfName: 'ALL',
    bookShelf: 'All',
    books: [],
    booksApi: apiStatusConstance.initial,
  }

  componentDidMount = () => {
    this.getAllBooks()
  }

  onClickedTryAgain = () => {
    this.getAllBooks()
  }

  onClickSearchButton = () => {
    this.getAllBooks()
  }

  updateBookshelf = (value, label) => {
    this.setState({bookshelfName: value, bookShelf: label}, this.getAllBooks)
  }

  getAllBooks = async () => {
    this.setState({booksApi: apiStatusConstance.inProgress})
    const {searchInput, bookshelfName} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchInput}`,
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const formattedBooksList = data.books.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        coverPic: eachBook.cover_pic,
        authorName: eachBook.author_name,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
      }))
      this.setState({
        books: formattedBooksList,
        booksApi: apiStatusConstance.success,
      })
    } else {
      this.setState({booksApi: apiStatusConstance.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
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

  renderRequiredBooks = () => {
    const {books} = this.state
    return (
      <ul>
        <li className="row-list-items">
          {books.map(eachBook => (
            <Books eachBookDetails={eachBook} key={eachBook.id} />
          ))}
        </li>
      </ul>
    )
  }

  renderNoBooks = () => {
    const {searchInput} = this.state
    return (
      <div className="no-books-container">
        <img
          src="https://res.cloudinary.com/dxqcmp4il/image/upload/v1672895458/Group_2x_1_vdgmef.png"
          alt="not found"
          className="no-books"
        />
        <p className="no-books-text">
          Your search for {searchInput} is not found
        </p>
      </div>
    )
  }

  renderingBooksSuccess = () => {
    const {books} = this.state
    switch (books.length) {
      case 0:
        return this.renderNoBooks()
      default:
        return this.renderRequiredBooks()
    }
  }

  renderingBooks = () => {
    const {booksApi} = this.state
    switch (booksApi) {
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
    const {searchInput, bookShelf} = this.state
    return (
      <div>
        <Header />
        <div className="bookShelves-container">
          <div className="container">
            <div className="shelves-container">
              <h1 className="bookShelves-heading">Bookshelves</h1>
              <ul>
                <li className="list-items">
                  {initialBookshelvesList.map(eachBookShelve => (
                    <BookShelvesList
                      bookshelvesListDetails={eachBookShelve}
                      key={eachBookShelve.id}
                      updateBookshelf={this.updateBookshelf}
                    />
                  ))}
                </li>
              </ul>
            </div>
            <div className="books-container">
              <div className="books-header">
                <h1 className="books-type">{bookShelf} Books</h1>
                <div className="container">
                  <input
                    type="search"
                    value={searchInput}
                    onChange={this.onChangeSearchInput}
                    placeholder="Search"
                    className="search-input"
                  />
                  <BiSearchAlt2
                    className="search-icon"
                    onClick={this.onClickSearchButton}
                    testid="searchButton"
                  />
                </div>
              </div>
              <div className="small-shelves-container">
                <h1 className="bookShelves-heading">Bookshelves</h1>
                <ul>
                  <li className="small-list-items">
                    {initialBookshelvesList.map(eachBookShelve => (
                      <BookShelvesList
                        bookshelvesListDetails={eachBookShelve}
                        key={eachBookShelve.id}
                        updateBookshelf={this.updateBookshelf}
                      />
                    ))}
                  </li>
                </ul>
              </div>

              {this.renderingBooks()}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default BookShelves
