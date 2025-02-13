import { Cmd } from 'redux-loop';
import { fetchCatsCommit, fetchCatsRollback } from './actions';
import { FetchCatsRequest } from './types/actions.type';
import { Picture } from './types/picture.type';

const parsePictureResponse = async (response: Response) => {
  const data = await response.json();
  return data.hits.map((hit: any) => ({
    previewFormat: hit.previewURL,
    webFormat: hit.webformatURL,
    author: hit.user,
    largeFormat: hit.largeImageURL
  }));
};

export const cmdFetch = (action: FetchCatsRequest) =>
  Cmd.run(
    async () => {
      const response = await fetch(action.path, {
        method: action.method,
      });
      if (!response.ok) throw new Error(response.statusText);
      return parsePictureResponse(response);
    },
    {
      successActionCreator: fetchCatsCommit,
      failActionCreator: fetchCatsRollback,
    }
  );