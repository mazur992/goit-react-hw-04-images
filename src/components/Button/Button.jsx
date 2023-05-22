import PropTypes from 'prop-types';
import css from './Button.module.css';
export default function Button({ images, incrementPage }) {
  const handleLoadMore = () => {
    incrementPage();
  };
  return (
    images.length !== 0 && (
      <button className={css.button} type="button" onClick={handleLoadMore}>
        Load more
      </button>
    )
  );
}

Button.propTypes = {
  images: PropTypes.array.isRequired,
  incrementPage: PropTypes.func.isRequired,
};
