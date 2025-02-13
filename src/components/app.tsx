import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Counter from './counter';
import Pictures from './pictures';

const App = () => (
  <Provider store={store}>
    <>
      <Counter />
      <Pictures />
    </>
  </Provider>
);

export default App;
