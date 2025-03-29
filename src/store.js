import { createStore } from 'redux';


const initialState = {
  temperatureUnit: 'metric',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_UNIT':
      return {
        ...state,
        temperatureUnit: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
