import { AnyAction } from "redux";
import News from "../../models/News";
import { SET_NEWS_DATA } from "../actions/news";

export interface NewsState {
  newsDate: News[];
}

const initialState: NewsState = {
  newsDate: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_NEWS_DATA:
      return {
        newsDate: action.newsDate,
      };
  }
  return state;
};
