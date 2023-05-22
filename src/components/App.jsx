// import { Component } from 'react';
import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import Api from '../servises/api';

import css from './App.module.css';
export function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);

  const [largeImg, setLargeImg] = useState({ img: '', alt: '' });
  const [isShowModal, setIsShowModal] = useState(false);
  const incrementPage = () => {
    setPage(Number([page]) + 1);
  };
  const onSubmit = async data => {
    setImages([]);
    setSearch(data);
    setPage(1);
  };
  const addLargeImg = (img, tags) => {
    setLargeImg({ img, tags });
  };
  const showModal = () => {
    setIsShowModal(true);
  };
  const hideModal = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    async function fetchData() {
      const api = await Api(search, page);
      try {
        if (api.length === 0) {
          setError(false);
          Notiflix.Notify.failure('Nothing was found for your request');
          return;
        }
        setImages(prevState => [...prevState, { images: api }]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (search !== '') {
      setIsLoading(true);

      fetchData();
    }
  }, [search, page]);
  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} isSubmiting={isLoading} />
      <ImageGallery>
        <ImageGalleryItem
          cards={images}
          showModal={showModal}
          addLargeI={addLargeImg}
        />
      </ImageGallery>
      <Loader loading={isLoading} />
      {error && <Button images={images} incrementPage={incrementPage} />}
      {isShowModal && (
        <Modal
          largeImg={largeImg}
          isShowModal={isShowModal}
          hideModal={hideModal}
        />
      )}
    </div>
  );
}
