import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { NewsState } from "../reducers/news";

import News from "../../models/News";

export const SET_NEWS_DATA = "SET_NEWS_DATA";

export const fetchNewsData = () => {
  return async (dispatch: ThunkDispatch<NewsState, void, Action>) => {
    try {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
      );
      const responseData = await response.json();

      let newsDate: News[] = [];

      for (const news of responseData.Data) {
        const formatedDate = new Date(news.published_on * 1000)
          .toString()
          .split(" ")
          .splice(1, 2)
          .join(" ");

        newsDate.push(
          new News(
            news.source_info.name,
            formatedDate,
            news.title,
            news.imageurl,
            news.url
          )
        );

        if (newsDate.length === 20) {
          break;
        }
      }

      dispatch({
        type: SET_NEWS_DATA,
        newsDate: newsDate,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
