import React from 'react';
import css from './button.module.css';
// import { render } from '@testing-library/react'
import { Component } from 'react';

export class Button extends Component {
  handleLoadMore = async () => {
    await this.props.loadMore();
  };

  render() {
    return (
      <button
        onClick={this.handleLoadMore}
        type="button"
        className={css.Button}
      >
        Load more
      </button>
    );
  }
}
