const initialState = [];

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return action.payload;
    default:
      return state;
  }
};
