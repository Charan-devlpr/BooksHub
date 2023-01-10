import {Component} from 'react'
import './index.css'

class BookShelvesList extends Component {
  render() {
    const {bookshelvesListDetails, updateBookshelf} = this.props
    const {label, value} = bookshelvesListDetails
    const onClickedTab = () => {
      updateBookshelf(value, label)
    }

    return (
      <li>
        <button
          type="button"
          className="bookShelves"
          value={value}
          onClick={onClickedTab}
        >
          {label}
        </button>
        <button
          type="button"
          className="small-bookShelves"
          value={value}
          onClick={onClickedTab}
        >
          {label}
        </button>
      </li>
    )
  }
}

export default BookShelvesList
