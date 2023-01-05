import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const Books = props => {
  const {eachBookDetails} = props
  const {id, coverPic, title, authorName, rating, readStatus} = eachBookDetails
  return (
    <Link to={`/books/${id}`}>
      <li>
        <div className="book-container">
          <img src={coverPic} className="cover-pic" alt={title} />
          <div>
            <h1 className="book-heading">{title}</h1>
            <p className="author-name">{authorName}</p>
            <div className="container">
              <p className="avg-rating">Avg Rating</p>
              <BsFillStarFill className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
            <div className="container">
              <p className="status">Status: </p>
              <p className="read-status">{readStatus}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default Books
