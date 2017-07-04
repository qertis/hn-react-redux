import browserHistory from 'react-router/lib/browserHistory';

// Constants

export const LOCATION_CHANGE = 'LOCATION_CHANGE';

// Actions

export const locationChange = (location = '/') => ({
  type: LOCATION_CHANGE,
  data: location
});

export const updateLocation = ({dispatch}) => next => dispatch(locationChange(next));

// Reducer

const initialState = browserHistory.getCurrentLocation();

const reducer = (state = initialState, action) => (
  action.type === LOCATION_CHANGE ? action.data : state
);

export default reducer;
