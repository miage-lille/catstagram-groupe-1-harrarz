import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { picturesSelector, getSelectedPicture, isLoadingSelector } from '../reducer';
import { isSome } from 'fp-ts/Option';
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

const LoadingText = styled.div`
  padding: 2rem;
  text-align: center;
  color: #666;
  font-size: 1.2rem;
`;

const Pictures = () => {
  const pictures = useSelector(picturesSelector);
  const selectedPictureOption = useSelector(getSelectedPicture);
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();

  const handlePictureClick = (picture: Picture) => {
    dispatch({ type: 'SELECT_PICTURE', picture });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  if (isLoading) {
    return <LoadingText>Loading cats...</LoadingText>;
  }

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
      
      {isSome(selectedPictureOption) && (
        <ModalPortal 
          largeFormat={selectedPictureOption.value.largeFormat}
          close={handleCloseModal}
        />
      )}
    </>
  );
};

export default Pictures;