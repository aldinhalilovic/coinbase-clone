import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import Colors from "../constants/Colors";
import React, { useEffect } from "react";
import CBButton from "../components/CBButton";

import { WatchlistState } from "../store/reducers/watchlist";
import * as watchListActions from "../store/actions/watchlist";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const loadData = () => {
    try {
      dispatch(watchListActions.fetchCoinData() as any);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Image
          style={styles.image}
          source={{ uri: "https://i.imgur.com/9EEaSaS.png" }}
        />
        <Text style={styles.title}>Welcome to CoinBase</Text>
        <Text style={styles.subTitle}>Make your first investment today!</Text>
        <CBButton title="Get Started" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
    fontSize: 18,
    marginBottom: 24,
    color: Colors.subtitle,
  },
});
