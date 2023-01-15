import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import watchlistReducer from "./src/store/reducers/watchlist";
import topmoversReducer from "./src/store/reducers/topmovers";
import newsReducer from "./src/store/reducers/news";
import { StatusBar } from "expo-status-bar";

const rootReducer = combineReducers({
  watchList: watchlistReducer,
  topMovers: topmoversReducer,
  news: newsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar />
      <AppNavigator />
    </Provider>
  );
}
