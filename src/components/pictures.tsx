import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { picturesSelector, getSelectedPicture } from '../reducer';
import ModalPortal from './modal';
import { Picture } from '../types/picture.type';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const Pictures = () => {
  const pictures = useSelector(picturesSelector);
  const selectedPicture = useSelector(getSelectedPicture);
  const dispatch = useDispatch();

  const handlePictureClick = (picture: Picture) => {
    dispatch({ type: 'SELECT_PICTURE', picture });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <>
      <Container>
        {pictures.map((picture, index) => (
          <Image 
            key={`${picture.author}-${index}`}
            src={picture.previewFormat}
            alt={`Picture by ${picture.author}`}
            onClick={() => handlePictureClick(picture)}
          />
        ))}
      </Container>
      
      {selectedPicture && (
        <ModalPortal 
          largeFormat={selectedPicture.largeFormat} 
          close={handleCloseModal}
        />
      )}
    </>
  );
};

export default Pictures;