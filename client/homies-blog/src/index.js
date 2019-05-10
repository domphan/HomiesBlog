import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage, BlogFeed, Navbar, SignupForm, LoginForm, PopperContainer, ProfilePage, PostForm } from './components';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers from './reducers';
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import { logoutUser, setAuthToken, setCurrentUser } from './actions/user_actions';
import jwt_decode from 'jwt-decode';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser([]));
    window.location.href = '/login'
  }
}


ReactDOM.render(
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Navbar />
          <PopperContainer />
          <Switch>
            <Route 
              path='/feed' 
              render={(props) => <PostForm {...props} formType='Create' />} 
            />
            <Route path='/login' component={LoginForm} />
            <Route path='/signup' component={SignupForm} />
            <Route path='/profile/:username' component={ProfilePage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  </JssProvider>
  , document.getElementById('root'));
