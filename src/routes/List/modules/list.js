// Constants

export const PAGE_DECREMENT = 'PAGE_DECREMENT';
export const PAGE_INCREMENT = 'PAGE_INCREMENT';
export const PAGE_LOAD = 'PAGE_LOAD';
export const FETCH_BASE_URL = 'https://node-hnapi.herokuapp.com';

// Actions

const fetchNews = (type, [dispatch, getState]) => {
  return new Promise((resolve, reject) => {
    const page = (({page}) => {
      switch (type) {
        case PAGE_INCREMENT: return (page + 1);
        case PAGE_DECREMENT: return (page <= 1 ? 1 : page - 1);
        default: return page;
      }
    })(getState().list);
    const url = `${FETCH_BASE_URL}/news?page=${page}`;

    fetch(url).then(data => data.json()).then(data => {
      dispatch({
        type: PAGE_LOAD,
        data,
        page
      });
      resolve();
    }).catch(() => {
      reject();
    });
  });
};

export const initNews = () => (...params) => fetchNews(null, params);

export const prevNews = () => (...params) => fetchNews(PAGE_DECREMENT, params);

export const nextNews = () => (...params) => fetchNews(PAGE_INCREMENT, params);

export const actions = {
  prevNews,
  nextNews,
  initNews,
};

// Action Handlers

const ACTION_HANDLERS = {
  [PAGE_LOAD]: (arg, {data, page}) => ({
    list: data,
    page
  })
};

// Reducer

const initialState = {
  list: [],
  page: 'loading...'
};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default reducer;
