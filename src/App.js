import React,  {Component} from 'react';
import Movies from './components/movies';

import './App.css';

class App extends Component {
  render(){
  return (
    <div className="App">
    <main className="container">
        <Movies />
    
    </main>
    </div>
  );}
}

export default App;
