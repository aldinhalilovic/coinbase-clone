import { AnyAction } from "redux";
import Coin from "../../models/Coin";
import { SET_WATCHLIST_DATA } from "../actions/watchlist";

export interface WatchListState {
  watchListData: Coin[];
}

const initialState: WatchListState = {
  watchListData: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_WATCHLIST_DATA:
      return {
        watchListData: action.coinData,
      };
    default:
      return state;
  }
};
