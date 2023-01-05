import './index.css'

const SliderItems = props => {
  const {sliderItemDetails} = props
  const {coverPic, title, authorName} = sliderItemDetails
  return (
    <li className="slider-item-container">
      <img src={coverPic} alt={title} className="cover-pic" />
      <h1 className="book-title">{title}</h1>
      <h1 className="book-author-name">{authorName}</h1>
    </li>
  )
}

export default SliderItems
