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

export const onLoad = () => (...params) => fetchNews(null, params);

export const onPrev = () => (...params) => fetchNews(PAGE_DECREMENT, params);

export const onNext = () => (...params) => fetchNews(PAGE_INCREMENT, params);

export const actions = {
  onPrev,
  onNext,
  onLoad
};

// Action Handlers

const ACTION_HANDLERS = {
  [PAGE_LOAD]: ({}, {data, page}) => ({
    list: data,
    page
  })
};

// Reducer

const initialState = {
  list: [],
  page: 1
};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default reducer;
