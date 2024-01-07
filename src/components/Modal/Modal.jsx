import React from 'react'; // rafce + Tab ( + Enter) - розгорне нам шаблон (бо є плагін ES7)
import css from './modal.module.css';
import { Component } from 'react';

class Modal extends Component {
  handleOverlayClickClose = event => {
    if (event.target === event.currentTarget) {
      this.props.handleCloseModal();
    }
  };

  handleKeyPressESC = event => {
    if (event.code === 'Escape') {
      this.props.handleCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPressESC);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPressESC);
  }

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleOverlayClickClose}>
        <img
          id={this.props.modalData.id}
          className={css.Modal}
          src={this.props.modalData.largeImageURL}
          alt={this.props.modalData.tags}
        />
      </div>
    );
  }
}

export { Modal };
