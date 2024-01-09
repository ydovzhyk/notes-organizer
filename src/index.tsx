import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Redux/store'; 

import './index.css';

import App from './App';
import Loader from './components/Loader/Loader';
import './styles/styles.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const basename = process.env.NODE_ENV === 'production' ? '/notes-organizer/' : '/';

root.render(
  <BrowserRouter basename={basename}>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

//потрібно додати react-router-dom, redux, і redux-persist до додатку та налаштувати їх, а також включити роутер та редукс у вашому вихідному файлі index.tsx.
//Встановіть необхідні залежності:
//npm install react-router-dom redux react-redux redux-persist