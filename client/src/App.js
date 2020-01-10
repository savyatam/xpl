import React from 'react';
import Navbar from './components/Navbar'
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Yes from './components/Yes'
function App() {
  return (
    <BrowserRouter>
        <div className="App">
        <Navbar/>
        <Route exact path='/' component={Home}/>
          <Route path='/about' component={About} />
          <Route path='/yed' component={Yes} />
        </div>
      </BrowserRouter>
  );
}

export default App;
