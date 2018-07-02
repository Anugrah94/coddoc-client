import React, { Component } from 'react';
import { 
	BrowserRouter as Router,
	Route,
	Switch
 }
from 'react-router-dom';

import Home from './views/Home';
import Login from './views/Login';
import Main from './views/Main';
import MainDetail from './views/MainDetail'
import Profile from './views/Profile';
import Register from './views/Register';
import NotFound from './components/NotFound';

class App extends Component {
  componentDidMount() {
    let language = sessionStorage.getItem('language');
    if(!language){
      sessionStorage.setItem('language', 'python');
    };
  };

  render() {
    return (
      <div>
        <Router>
					<Switch>
						<Route exact path='/' component={ Home } />
						<Route path='/login' component={ Login } />
						<Route path='/register' component={ Register } />
						<Route exact path='/main' component={ Main } />
            <Route path='/main/detail/:id' render={ props => (
							<MainDetail {...props}/>
              )
            } />
            <Route path='/main/profile' component={ Profile } />
            <Route path='*' component= { NotFound } />
					</Switch>
				</Router>
      </div>
    );
  };
};

export default App;
