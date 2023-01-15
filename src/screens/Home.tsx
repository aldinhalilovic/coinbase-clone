import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import Colors from "../constants/Colors";
import CBButton from "../components/CBButton";

import { useSelector, useDispatch } from "react-redux";

import { WatchListState } from "../store/reducers/watchlist";
import { TopmoversState } from "../store/reducers/topmovers";
import { NewsState } from "../store/reducers/news";
import * as watchListActions from "../store/actions/watchlist";
import * as topmoversAction from "../store/actions/topmovers";
import * as newsAction from "../store/actions/news";

import WatchList from "../components/WatchList";
import TopMoversListItem from "../components/TopMoversListItem";
import TopMovers from "../components/TopMoversList";
import NewsListItem from "../components/NewsListItem";
import NewsList from "../components/NewsList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";

interface RootState {
  watchList: WatchListState;
  topMovers: TopmoversState;
  news: NewsState;
}

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const watchlistData = useSelector(
    (state: RootState) => state?.watchList.watchListData
  );

  const topMoversData = useSelector(
    (state: RootState) => state?.topMovers?.topMoversData
  );

  const newsData = useSelector((state: RootState) => state?.news?.newsDate);

  const loadData = () => {
    try {
      dispatch(watchListActions.fetchCoinData() as any);
      dispatch(topmoversAction.fetchTopMoversData() as any);
      dispatch(newsAction.fetchNewsData() as any);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const viewMoreHandler = () => {
    navigation.navigate("News");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Image
          style={styles.image}
          source={{ uri: "https://i.imgur.com/9EEaSaS.png" }}
        />
        <Text style={styles.title}>Welcome to Coinbase!</Text>
        <Text style={styles.subTitle}>Make your first investment today</Text>
        <CBButton title="Get Started" />
        <WatchList coinData={watchlistData} />
        <TopMovers coinData={topMoversData} />
        <NewsList
          newsData={newsData}
          isHomeScreen={true}
          viewMoreHandler={viewMoreHandler}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  image: {
    height: 250,
    width: 150,
    marginTop: 40,
  },
  title: {
    fontSize: 21,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subTitle: {
    fontSize: 17,
    marginBottom: 24,
    color: Colors.subtitle,
  },
});

export default Home;
