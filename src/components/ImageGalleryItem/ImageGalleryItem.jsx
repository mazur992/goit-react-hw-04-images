import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem(props) {
  const handleClick = event => {
    props.addLargeI(
      event.currentTarget.dataset.large,
      event.currentTarget.dataset.tags
    );
    props.showModal();
  };
  const { cards } = props;
  if (cards.length === 0) return;
  return cards.map(card => {
    return card.images.map(img => {
      return (
        <li
          key={img.id}
          className={css.galleryItem}
          data-large={img.largeImageURL}
          data-tags={img.tags}
          onClick={handleClick}
        >
          <img
            className={css.galleryItemImage}
            src={img.webformatURL}
            alt={img.tags}
          />
        </li>
      );
    });
  });
}

ImageGalleryItem.propTypes = {
  cards: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
  addLargeI: PropTypes.func.isRequired,
};
