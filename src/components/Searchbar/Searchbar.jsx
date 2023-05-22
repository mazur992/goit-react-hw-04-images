import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export default function Searchbar(props) {
  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const search = await form.elements.search.value.trim();
    if (search.length === 0) {
      Notiflix.Notify.failure('you need to enter a keyword to search');
      return;
    }
    props.onSubmit(search);
    form.reset();
  };
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmiting: PropTypes.bool.isRequired,
};
