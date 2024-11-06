import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProviderWrapper } from './Context/themeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './Utils/i18n';
import { Provider } from 'react-redux';
import rootRedux from './Redux';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

root.render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <Provider store={rootRedux.store}>
        <PersistGate loading={null} persistor={rootRedux.persistor}>
          <GoogleOAuthProvider clientId={"989952107024-ubosbl0ija4g3ss9ditflvu7q7eu60da.apps.googleusercontent.com"}>
            <App />
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </ThemeProviderWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
