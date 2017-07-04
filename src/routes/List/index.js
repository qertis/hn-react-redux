import {injectReducer} from '../../store/reducers';

export default store => ({
  path: 'News/:id',

  /* Async getComponent is only invoked when route matches */
  getComponent(next, cb) {
    require.ensure([], require => {
      const ListView = require('./containers/ListContainer').default;
      const listReducer = require('./modules/list').default;
      const favouriteReducer = require('./modules/favourite').default;

      injectReducer(store, {
        key: 'list',
        reducer: listReducer,
      });
      injectReducer(store, {
        key: 'favourites',
        reducer: favouriteReducer,
      });

      cb(null, ListView);
    }, 'ListView');
  }
});
