import { API_KEY } from './config';
import { 
  Decrement, 
  FetchCatsCommit, 
  FetchCatsRequest, 
  FetchCatsRollback, 
  Increment 
} from './types/actions.type';
import { Picture } from './types/picture.type';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export const fetchCatsRequest = (counter: number): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: `https://pixabay.com/api/?key=${API_KEY}&per_page=${counter}&q=cat`
});

export const fetchCatsCommit = (payload: Picture[]): FetchCatsCommit => ({ 
  type: 'FETCH_CATS_COMMIT', 
  payload 
});

export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({ 
  type: 'FETCH_CATS_ROLLBACK', 
  error 
});