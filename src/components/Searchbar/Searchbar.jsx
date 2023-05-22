import { Component } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const search = await form.elements.search.value.trim();
    if (search.length === 0) {
      Notiflix.Notify.failure('you need to enter a keyword to search');
      return;
    }
    this.props.onSubmit({ search });
    form.reset();
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
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
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmiting: PropTypes.bool.isRequired,
};
