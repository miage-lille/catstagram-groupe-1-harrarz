import { State } from './reducer';
import { Picture } from './types/picture.type';
import { PicturesState } from './types/api.type';
import { Option } from 'fp-ts/Option';

export const counterSelector = (state: State): number => state.counter;
export const picturesSelector = (state: State): PicturesState => state.pictures;
export const getSelectedPicture = (state: State): Option<Picture> => state.pictureSelected;