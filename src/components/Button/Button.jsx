import PropTypes from 'prop-types';
import css from './Button.module.css';
export default function Button({ props, incrementPage }) {
  const handleLoadMore = () => {
    incrementPage();
  };
  const { images } = props;
  return (
    images.length !== 0 && (
      <button className={css.button} type="button" onClick={handleLoadMore}>
        Load more
      </button>
    )
  );
}

Button.propTypes = {
  props: PropTypes.object.isRequired,
  incrementPage: PropTypes.func.isRequired,
};
