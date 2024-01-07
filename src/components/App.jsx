import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';

import { STATUSES } from '../services-functions/statuses.js';
import { fetchInfo } from '../services-functions/api.js';
import { Component } from 'react';

export class App extends Component {
  state = {
    pictures: null,
    error: null,
    pageCount: 1,
    status: STATUSES.idle,
    searchWord: '',
    emptyResponse: false,
    modalIsOpen: false,
    modalData: null,
  };

  componentDidMount() {}

  fetchByUser = async () => {
    try {
      this.setState({ status: STATUSES.pending });
      const pictures = await fetchInfo(
        this.state.searchWord,
        this.state.pageCount
      ); //requestPostByQuery
      // console.log(pictures)

      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...pictures],
        status: STATUSES.success,
      }));

      if (pictures.length < 12) {
        this.setState({ emptyResponse: true });
      } else {
        this.setState({ emptyResponse: false });
      }
    } catch (error) {
      this.setState({ error: error.message, status: STATUSES.error });
      console.log('errorio');
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchWord !== this.state.searchWord ||
      prevState.pageCount !== this.state.pageCount
    ) {
      this.fetchByUser();
      //  this.loadMore(prevState.pageCount);
    }
  }

  onSubmit = formData => {
    // this.setState({searchWord: formData});
    // this.setState({ pageCount: 1 })
    if (this.state.searchWord === formData) {
      return alert(`You are viewing  ${formData} right now.`);
    }

    this.setState({
      searchWord: formData.toLowerCase(),
      pictures: [],
      pageCount: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ pageCount: prevState.pageCount + 1 }));

    // try {
    //   const nextPage = this.state.pageCount + 1;
    //   this.setState({ status: STATUSES.pending });
    //   const picturesLoadMore = await fetchInfo(this.state.searchWord, nextPage); //requestPostByQuery
    //   // console.log(picturesLoadMore.length)

    //   if (picturesLoadMore.length < 12) {
    //     this.setState({ emptyResponse: true });
    //   }

    //   this.setState(prevState => ({
    //     pictures: [...prevState.pictures, ...picturesLoadMore],
    //   }));

    //   this.setState({ pageCount: nextPage, status: STATUSES.success });
    // } catch (error) {
    //   this.setState({ error: error.message, status: STATUSES.error });
    //   console.log('errorio');
    // }
  };

  handleShowImageId = imageId => {
    const selected = this.state.pictures.find(
      picture => picture.id === imageId
    );
    this.setState({ modalIsOpen: true, modalData: selected });
    return selected;
  };

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div
        style={{
          // height: '100vh',
          maxWidth: '1240px',
          margin: '0 auto',
          // alignContent: "center",
          // alignItems: "center",
          // justifyContent: "center",
          display: 'flex',
          flexDirection: 'column',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />

        <ImageGallery
          picturesQuery={this.state.pictures}
          handleShowImageId={this.handleShowImageId}
        />

        {this.state.status === STATUSES.pending && <Loader />}

        {this.state.pictures !== null && this.state.emptyResponse === false && (
          <Button loadMore={this.loadMore} />
        )}
        {this.state.modalIsOpen === true && (
          <Modal
            modalData={this.state.modalData}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
