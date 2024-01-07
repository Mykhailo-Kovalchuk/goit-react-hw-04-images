// import React from 'react'
import css from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const handleInputChange = event => {
    event.preventDefault();
    const inputValue = event.currentTarget.elements.searchInput.value;
    // console.log(inputValue)
    onSubmit(inputValue.toLowerCase());
  };

  return (
    <header className={css.Searchbar}>
      <form className="form" onSubmit={handleInputChange}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          name="searchInput"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

export { Searchbar };
