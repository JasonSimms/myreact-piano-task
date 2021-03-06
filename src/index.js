import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import ApolloPlayer from "./components/ApolloNetworkPlayer"
import * as serviceWorker from './serviceWorker';



ReactDOM.render(<React.Fragment><ApolloPlayer/><App/></React.Fragment>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
