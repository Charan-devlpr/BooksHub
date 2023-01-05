import './index.css'

const BookShelvesList = props => {
  const {bookshelvesListDetails, updateBookshelf} = props
  const {label, value} = bookshelvesListDetails
  const onClickedTab = () => {
    updateBookshelf(value, label)
  }
  return (
    <button
      type="button"
      className="bookShelves"
      value={value}
      onClick={onClickedTab}
    >
      {label}
    </button>
  )
}

export default BookShelvesList
