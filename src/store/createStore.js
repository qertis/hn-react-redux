import {applyMiddleware, compose, createStore as createReduxStore} from 'redux';
import thunk from 'redux-thunk';
import {browserHistory} from 'react-router';
import makeRootReducer from './reducers';
import {updateLocation} from './location';

const createStore = (initialState = {}) => {
  // Middleware Configuration
  const middleware = [thunk];

  // Store Enhancers
  const enhancers = [];
  const composeEnhancers = (() => {
    if (__DEV__ && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    } else {
      return compose;
    }
  })();

  // Store Instantiation and HMR Setup
  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};

export default createStore;
