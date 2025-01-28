import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Redux/store';

import './index.css';

import App from './App';
import Loader from './components/Loader/Loader';
import './styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

//для деплоя на GitHub page
//<BrowserRouter basename={`${process.env.PUBLIC_URL}`}>

//UserRoutes.tsx
//<Route path="" element={<HomePage />} />

//package.json
//"predeploy": "npm run build",
// "deploy": "gh-pages -d build",
// "build": "react-scripts build && cp build/index.html build/404.html"

//потрібно додати react-router-dom, redux, і redux-persist до додатку та налаштувати їх, а також включити роутер та редукс у вашому вихідному файлі index.tsx.
//Встановіть необхідні залежності:
//npm install react-router-dom redux react-redux redux-persist
