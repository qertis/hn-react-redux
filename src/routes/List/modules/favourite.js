// Constants

export const SAVE_TO_FAVOURITE = 'SAVE_TO_FAVOURITE';
export const REMOVE_FROM_FAVOURITE = 'REMOVE_FROM_FAVOURITE';

// Actions

export const saveToFavourite = (item = {}) => ({
  type: SAVE_TO_FAVOURITE,
  data: item
});

export const removeFromFavourite = (item = {}) => ({
  type: REMOVE_FROM_FAVOURITE,
  data: item,
});

const updateStorage = state => {
  try {
    localStorage.setItem('favourites', JSON.stringify(state.map(({id}) => ({id}))));
  } catch (e) {
    console.error(e);
  }

  return state;
};

const getStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('favourites')) || [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const actions = {
  saveToFavourite,
  removeFromFavourite,
};

// Action Handlers

const ACTION_HANDLERS = {
  [SAVE_TO_FAVOURITE]: (state, action) => {
    return updateStorage(state.concat(action.data));
  },
  [REMOVE_FROM_FAVOURITE]: (state, action) => {
    const index = state.findIndex(({id}) => id === action.data.id);

    return updateStorage(state.filter((item, i) => i !== index));
  }
};

// Reducer

const initialState = getStorage();

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default reducer;
