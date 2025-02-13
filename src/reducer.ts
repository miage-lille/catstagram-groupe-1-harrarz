import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import fakeDatas from './fake-datas.json';

export type State = {
  counter: number;
  pictures: Picture[];
  selectedPicture: Picture | null;
}

export const defaultState: State = {
  counter: 0,
  pictures: [],
  selectedPicture: null
}

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  
  switch (action.type) {
    case 'INCREMENT': {
      const newCounter = state.counter + 1;
      return {
        ...state,
        counter: newCounter,
        pictures: fakeDatas.slice(0, newCounter)
      };
    }
    case 'DECREMENT': {
      const newCounter = Math.max(3, state.counter - 1);
      return {
        ...state,
        counter: newCounter,
        pictures: fakeDatas.slice(0, newCounter)
      };
    }
    case 'SELECT_PICTURE':
      return {
        ...state,
        selectedPicture: action.picture
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        selectedPicture: null
      };
    case 'FETCH_CATS_REQUEST':
      throw 'Not Implemented';
    case 'FETCH_CATS_COMMIT':
      throw 'Not Implemented';
    case 'FETCH_CATS_ROLLBACK':
      throw 'Not Implemented';
  }
};

export const counterSelector = (state: State) => {
  return state.counter;
};

export const picturesSelector = (state: State) => {
  return state.pictures;
};

export const getSelectedPicture = (state: State) => {
  return state.selectedPicture;
};

export default compose(liftState, reducer);