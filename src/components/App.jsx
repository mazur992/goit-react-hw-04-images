import { Component } from 'react';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import Api from '../servises/api';

import css from './App.module.css';
export class App extends Component {
  state = {
    images: [],
    search: '',
    page: 1,
    isLoading: false,
    error: true,

    largeImg: { img: '', alt: '' },
    isShowModal: false,
  };
  incrementPage = () => {
    const { page } = this.state;
    this.setState({ page: Number([page]) + 1 });
  };
  onSubmit = async data => {
    this.setState({ images: [], search: data, page: 1 });
  };
  addLargeImg = (img, tags) => {
    this.setState({ largeImg: { img: img, tags: tags } });
  };
  showModal = () => {
    this.setState({ isShowModal: true });
  };
  hideModal = () => {
    this.setState({ isShowModal: false });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.search !== prevState.search ||
      this.state.page !== prevState.page
    ) {
      this.setState({ isLoading: true });
      const { search } = this.state.search;
      try {
        this.setState({ error: true });
        const api = await Api(search, this.state.page);
        if (api.length === 0) {
          this.setState({ error: false });
          Notiflix.Notify.failure('Nothing was found for your request');
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, { images: api }],
        }));
      } catch (err) {
        console.log(err);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  componentWillUnmount() {}
  render() {
    const { isLoading, images, isShowModal, largeImg } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} isSubmiting={isLoading} />
        <ImageGallery>
          <ImageGalleryItem
            cards={images}
            showModal={this.showModal}
            addLargeI={this.addLargeImg}
          />
        </ImageGallery>
        <Loader loading={isLoading} />
        {this.state.error && (
          <Button props={this.state} incrementPage={this.incrementPage} />
        )}
        {isShowModal && (
          <Modal
            largeImg={largeImg}
            isShowModal={this.state.isShowModal}
            hideModal={this.hideModal}
          />
        )}
      </div>
    );
  }
}
