// Constants

export const SAVE_TO_FAVOURITE = 'SAVE_TO_FAVOURITE';
export const REMOVE_FROM_FAVOURITE = 'REMOVE_FROM_FAVOURITE';

// Actions

export const onSaveToFavourite = (item = {}) => ({
  type: SAVE_TO_FAVOURITE,
  data: item
});

export const onRemoveFromFavourite = (item = {}) => ({
  type: REMOVE_FROM_FAVOURITE,
  data: item
});

function updateStorage(state) {
  try {
    localStorage.setItem('favourites', JSON.stringify(state.map(({id}) => ({id}))));
  } catch (e) {
    console.error(e);
  }

  return state;
}

function getStorage() {
  try {
    return JSON.parse(localStorage.getItem('favourites')) || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const actions = {
  onSaveToFavourite,
  onRemoveFromFavourite,
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

  return handler ? handler(state, action) : state
};

export default reducer;
