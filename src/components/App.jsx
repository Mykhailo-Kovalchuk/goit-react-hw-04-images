import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';

import { STATUSES } from '../services-functions/statuses.js';
import { fetchInfo } from '../services-functions/api.js';
// import { Component } from 'react';
import { useState, useEffect, useCallback } from 'react';
// import { useRef } from 'react';


export const App = () => {
  const [pictures, setPictures] = useState(null);
  const [error, setErrorio] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [status, setStatus] = useState(STATUSES.idle);
  const [searchWord, setSearchWord] = useState('');
  const [emptyResponse, setEmptyResponse] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
 
  console.log(error)

  // В мене він порожній, оскільки на початку нічого не відображається.
  // componentDidMount() {}

  const fetchByUser = useCallback(async () => {
    try {
      setStatus(STATUSES.pending);
      const pictures = await fetchInfo(searchWord, pageCount); //requestPostByQuery
      console.log(pictures)

      setPictures(prevPictures => (prevPictures ? [...prevPictures, ...pictures] : pictures)); // це ще під питанням
      setStatus(STATUSES.success);

      // this.setState(prevState => ({
      //   pictures: [...prevState.pictures, ...pictures],
      //   status: STATUSES.success,
      // }));
      if (pictures.length < 12) {
        setEmptyResponse(true);
      } else {
        setEmptyResponse(false);
      }
    } catch (error) {
      // this.setState({ error: error.message, status: STATUSES.error });
      setErrorio(error.message);
      setStatus(STATUSES.error);
      console.log('errorio');
    }
  }, [searchWord, pageCount]);

  // Життєвий цикл
  // типу DidUpdate
 // const firstRenderRef = useRef(true);

  //метод з вебінару
  // useEffect(() => {
  //   if (firstRenderRef.current === false) {
  //     console.log('false-render');
  //     fetchByUser();
  //   }
  //   return () => (firstRenderRef.current = false);
  // }, [fetchByUser, pageCount]);

// Метод ментора
  useEffect(() => {
    if (searchWord === "") {
      return;
    } 
      fetchByUser()

   
  }, [fetchByUser, pageCount, searchWord]);

  const onSubmit = formData => {
    // this.setState({searchWord: formData});
    // this.setState({ pageCount: 1 })
    if (searchWord === formData) {
      return alert(`You are viewing  ${formData} right now.`);
    }

    setSearchWord(formData.toLowerCase());
    setPictures([]);
    setPageCount(1);
  };

  const loadMore = () => {
    setPageCount(pageCount + 1);
  };

  const handleShowImageId = imageId => {
    const selected = pictures.find(picture => picture.id === imageId);
    // this.setState({ modalIsOpen: true, modalData: selected });
    setModalIsOpen(true);
    setModalData(selected);

    return selected;
  };

  const handleCloseModal = () => {
    // this.setState({ modalIsOpen: false });
    setModalIsOpen(false);
  };

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
      <Searchbar onSubmit={onSubmit} />

      <ImageGallery
        picturesQuery={pictures}
        handleShowImageId={handleShowImageId}
      />

      {status === STATUSES.pending && <Loader />}

      {pictures !== null && emptyResponse === false && (
        <Button loadMore={loadMore} />
      )}
      {modalIsOpen === true && (
        <Modal modalData={modalData} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};
