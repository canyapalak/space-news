import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
