import { Loop, liftState, Cmd, loop } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import { Option, none, some } from 'fp-ts/Option';

const API_KEY = '48828604-3ab7db17c0f0c243acbad50d5'; 

export type State = {
  counter: number;
  pictures: Picture[];
  selectedPicture: Option<Picture>;
  isLoading: boolean;
}

export const defaultState: State = {
  counter: 0,
  pictures: [],
  selectedPicture: none,
  isLoading: false
}

const fetchCats = async (counter: number) => {
  const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&per_page=${counter}&q=cat`);
  if (!response.ok) {
    throw new Error('Failed to fetch cats');
  }
  const data = await response.json();
  
  return data.hits.map((hit: any) => ({
    previewFormat: hit.previewURL,
    webFormat: hit.webformatURL,
    author: hit.user,
    largeFormat: hit.largeImageURL
  }));
};

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState;
  
  switch (action.type) {
    case 'INCREMENT': {
      const newCounter = state.counter + 1;
      return loop(
        { ...state, counter: newCounter, isLoading: true },
        Cmd.run(fetchCats, {
          args: [newCounter],
          successActionCreator: (pictures: any) => ({ 
            type: 'FETCH_CATS_COMMIT', 
            payload: pictures 
          }),
          failActionCreator: (error: any) => ({ 
            type: 'FETCH_CATS_ROLLBACK', 
            error 
          })
        })
      );
    }
    case 'DECREMENT': {
      const newCounter = Math.max(3, state.counter - 1);
      return loop(
        { ...state, counter: newCounter, isLoading: true },
        Cmd.run(fetchCats, {
          args: [newCounter],
          successActionCreator: (pictures: any) => ({ 
            type: 'FETCH_CATS_COMMIT', 
            payload: pictures 
          }),
          failActionCreator: (error: any) => ({ 
            type: 'FETCH_CATS_ROLLBACK', 
            error 
          })
        })
      );
    }
    case 'SELECT_PICTURE':
      return {
        ...state,
        selectedPicture: some(action.picture)
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        selectedPicture: none
      };
    case 'FETCH_CATS_REQUEST':
      return {
        ...state,
        isLoading: true
      };
    case 'FETCH_CATS_COMMIT':
      return {
        ...state,
        pictures: action.payload as Picture[],
        isLoading: false
      };
    case 'FETCH_CATS_ROLLBACK':
      return {
        ...state,
        isLoading: false
      };
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

export const isLoadingSelector = (state: State) => {
  return state.isLoading;
};

export default compose(liftState, reducer);