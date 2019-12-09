import React ,{Component}from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
//import store from './redux/store/index';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.min.css';

// apollo client  setup
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});
class App extends Component {

  render(){
  return ( 
    
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div> 
          <Main/>
        </div>
      </BrowserRouter> 
    </ApolloProvider>
  );
  }
}

export default App;
    