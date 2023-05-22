import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
export default function ImageGallery({ children }) {
  return <ul className={css.gallery}>{children}</ul>;
}

ImageGallery.propTypes = { children: PropTypes.element.isRequired };
