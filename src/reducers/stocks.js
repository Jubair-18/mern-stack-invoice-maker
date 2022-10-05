
import { FETCH_ALL_STOCKS, ADD_NEW_STOCKS, UPDATE_STOCKS, DELETE_STOCKS, GET_STOCK, START_LOADING, END_LOADING, FETCH_STOCK_BY_USER } from '../actions/constants'

const stocks = (state = { isLoading: true, stocks: [] }, action) => {
    switch (action.type) {
      case START_LOADING:
        return { ...state, isLoading: true };
      case END_LOADING:
        return { ...state, isLoading: false };
      case FETCH_ALL_STOCKS:
        return {
          ...state,
          stocks: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
      case FETCH_STOCK_BY_USER:
        return { ...state, stocks: action.payload };

      case GET_STOCK:
        return { ...state, stock: action.payload };
      case ADD_NEW_STOCKS:
        return { ...state, stocks: [...state.stocks, action.payload] };
      case UPDATE_STOCKS:
        return { ...state, stocks: state.stocks.map((stock) => (stock._id === action.payload._id ? action.payload : stock)) };
      case DELETE_STOCKS:
        return { ...state, stocks: state.stocks.filter((stock) => stock._id !== action.payload) };
      default:
        return state;
    }
  };

  export default stocks