import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './API/fetchImages';
import { fetchImagesTotal } from './API/fetchImagesTotal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import React from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const inputForSearch = e.target.elements.inputForSearch;
    if (inputForSearch.value.trim() === '') {
      return;
    }
    const response = await fetchImages(inputForSearch.value, 1);
    setImages(response);
    setIsLoading(false);
    setCurrentSearch(inputForSearch.value);
    setPage(1);

    const responseTotal = await fetchImagesTotal(inputForSearch.value, 1);
    console.log(responseTotal);
    setTotalPages(responseTotal);
  };

  const handleClickMore = async () => {
    const response = await fetchImages(currentSearch, setPage(page + 1));
    setImages([images, ...response]);
    setPage(page + 1);
  };

  const handleImageClick = e => {
    setModalOpen(true);
    setModalImg(e.target.alt);
    setModalAlt(e.target.name);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalImg('');
    setModalAlt('');
  };

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      handleModalClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery onImageClick={handleImageClick} images={images} />
          {images.length >= 12 && totalPages > images.length ? (
            <Button onClick={handleClickMore} />
          ) : null}
        </React.Fragment>
      )}
      {modalOpen ? (
        <Modal src={modalImg} alt={modalAlt} handleClose={handleModalClose} />
      ) : null}
    </div>
  );
};
