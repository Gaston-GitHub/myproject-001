import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/login.component.jsx';
import Register from '.components/register.component';
import Home from '.components/home.component';
import Profile from './components/profile.component.jsx';
import BoardUser from './components/board-user.component.jsx';
import BoardModerator from './components/board-moderator.component';
import BoardAdmin from './components/board-admin.component.jsx'

import { logout } from './actions/auth';
import { clearMessage } from './actions/message';

import { history } from './actions/history';


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModerators: false,
      showAdminBoard: false,
      currentUSer: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()) // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if(user) {
      this.setState({
        currentUser: user, 
        showModeratorBoard: user.roles.includes('ROLE_MODERATOR'),
        showAdminBoard: user.roles.includes('ROLE_ADMIN'),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return(
      <Router history={history}>
        <div>
          <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <Link to={'/'} className='navbar-breand'>
              myproject-001
            </Link>
            <div className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link to={'/home'} className='nav-link'>
                  Home
                </Link>
              </li>
              {showModeratorBoard && (
                <li className='nav-item'>
                  <Link to={'/mod'} className='nav-link'>
                    Moderator Board
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className='nav-item'>
                  <Link to={'/admin'} className='nav-link'>
                    Admin Board
                  </Link>
                </li>
              )}
              {currentUser ? (
                <div className='navbar-nav ml-auto'>
                  <li className='nav-item'>
                    <Link to={'/profile'} className='nav-link'>
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <a href='/login' className='nav-link' onClick={this.logOut}>
                    Log out
                    </a>
                  </li>
                </div>
              ) : (
                <div className='navbar-nav ml-auto'>
                  <li className='nav-item'>
                    <Link to={'/login'} className='nav-link'>
                      Login
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to={'/register'} className='nav-link'>
                      Sign up
                    </Link>
                  </li>
                </div>
              )}
            </div>

          </nav>

          <div className='container mt-3'>
            <Switch>
                <Route exact path={['/', '/home']} component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/profile' component={Profile} />
                <Route path='user' component={BoardUser} />
                <Route path='/mod' component={BoardModerator} />
                <Route path='amdin' component={BoardAdmin} />
            </Switch>
          </div>     
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  }
}

export default connect(mapStateToProps)(App);
