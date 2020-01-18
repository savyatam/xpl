import React from 'react';
import Navbar from './components/Navbar'
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Yes from './components/Yes'
import Yep from './components/yep'
import exp from './components/exp'
import imgs from './components/imgs'
import imgs1 from './components/com'
import imgs2 from './components/comview'
import Upload from './components/imageup'
import axios from 'axios'
import routes from './components/login'
import routes2 from './components/signup'
import routes3 from './components/logout'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/rootReducer';
import {addpost} from './components/login';
const store=createStore(rootReducer);
store.dispatch(addpost);console.log(addpost);
function App() {
  return (
    <BrowserRouter>
        <div className="App">
        <Navbar/>
        <Route path='/login' component={routes} />
        <Provider store={store}>
        <div>
        <Route exact path='/' component={Home}/>
          <Route path='/about' component={routes} />
          <Route path='/yed' component={Yes} />
          <Route path='/yep' component={Yep} />
          <Route path='/exp' component={exp} />
          <Route path='/imgs' component={imgs} />
          <Route path='/imgs1' component={imgs1} />
          <Route path='/imgs2' component={imgs2} />
          <Route path='/imageup' component={Upload} />
          <Route path='/signup' component={routes2} />
          <Route path='/logout' component={routes3} />
        </div>
        </Provider>
        </div>
      </BrowserRouter>

  );
}

export default App;
