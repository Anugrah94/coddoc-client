import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from "react-apollo";
import Modal from 'react-modal';
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import client from './graphql/client'

const options = {
  timeout: 3000,
  position: "bottom center"
};

Modal.setAppElement('#root');

ReactDOM.render(
  <ApolloProvider client={ client }>
    <Provider template={AlertTemplate} {...options}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'));
registerServiceWorker();
