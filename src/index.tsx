// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, HashRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor, store } from './Redux/store'; 

// import './index.css';

// import App from './App';
// import Loader from './components/Loader/Loader';
// import './styles/styles.scss';

// const basename = process.env.PUBLIC_URL || '/';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <BrowserRouter basename={basename}>
//     <Provider store={store}>
//       <PersistGate loading={<Loader />} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </BrowserRouter>
// );

// if (process.env.NODE_ENV === 'production') {
//   ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//     <HashRouter>
//       <Provider store={store}>
//         <PersistGate loading={<Loader />} persistor={persistor}>
//           <App />
//         </PersistGate>
//       </Provider>
//     </HashRouter>
//   );
// }

// if (process.env.NODE_ENV === 'development') {
//   ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//     <BrowserRouter>
//       <Provider store={store}>
//         <PersistGate loading={<Loader />} persistor={persistor}>
//           <App />
//         </PersistGate>
//       </Provider>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Redux/store'; 

import './index.css';

import App from './App';
import Loader from './components/Loader/Loader';
import './styles/styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>
);


//потрібно додати react-router-dom, redux, і redux-persist до додатку та налаштувати їх, а також включити роутер та редукс у вашому вихідному файлі index.tsx.
//Встановіть необхідні залежності:
//npm install react-router-dom redux react-redux redux-persist
