import React from 'react'
import { Provider } from 'react-redux';
import store from './redux/store'
import Header from './components/Header'
import MainBox from './components/MainBox';
import './style/Style.scss'


function App() {
  return (
    <Provider store={store}>
      <div className='main'>
        <Header />
        <MainBox />
      </div>
    </Provider>
  );
}

export default App;
