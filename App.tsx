import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import watchlistReducer from "./src/store/reducers/watchlist";

const rootReducer = combineReducers({
  watchList: watchlistReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
