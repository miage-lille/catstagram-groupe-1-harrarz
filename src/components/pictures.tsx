import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { picturesSelector, getSelectedPicture } from '../reducer';
import { isSome } from 'fp-ts/Option';
import ModalPortal from './modal';
import { Picture } from '../types/picture.type';
import { PicturesState } from '../types/api.type';

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

const ErrorText = styled.div`
  padding: 2rem;
  text-align: center;
  color: #ff0000;
  font-size: 1.2rem;
`;

const Pictures = () => {
  const picturesState = useSelector(picturesSelector);
  const selectedPicture = useSelector(getSelectedPicture);
  const dispatch = useDispatch();

  const handlePictureClick = (picture: Picture) => {
    dispatch({ type: 'SELECT_PICTURE', picture });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  if (picturesState.kind === 'LOADING') {
    return <LoadingText>Loading cats...</LoadingText>;
  }

  if (picturesState.kind === 'FAILURE') {
    return <ErrorText>Error: {picturesState.error}</ErrorText>;
  }

  return (
    <>
      <Container>
        {picturesState.pictures.map((picture: Picture, index: number) => (
          <Image 
            key={`${picture.author}-${index}`}
            src={picture.previewFormat}
            alt={`Picture by ${picture.author}`}
            onClick={() => handlePictureClick(picture)}
          />
        ))}
      </Container>
      
      {isSome(selectedPicture) && (
        <ModalPortal 
          largeFormat={selectedPicture.value.largeFormat}
          close={handleCloseModal}
        />
      )}
    </>
  );
};

export default Pictures;