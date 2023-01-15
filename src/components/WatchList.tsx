import React, { FC, useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import * as Haptics from "expo-haptics";

import WatchListItem from "./WatchListItem";
import * as watchListAction from "../store/actions/watchlist";
import Coin from "../models/Coin";
import Colors from "../constants/Colors";

interface TopMoverProps {
  coinData: Coin[];
}

const WatchList: FC<TopMoverProps> = ({ coinData }) => {
  const dispatch = useDispatch();

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<Coin>) => {
      return (
        <WatchListItem
          id={item.id}
          drag={drag}
          isActive={isActive}
          name={item.name}
          percentChange={item.precentChange}
          price={item.price}
          symbol={item.symbol}
        />
      );
    },
    []
  );

  return (
    <View>
      <Text style={styles.watchlistItem}>WatchList</Text>
      <View style={styles.watchListContainer}>
        <DraggableFlatList
          data={coinData}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          onDragBegin={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }
          onDragEnd={({ data }) =>
            dispatch(watchListAction.updateCoinData(data) as any)
          }
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  watchlistItem: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 64,
    marginBottom: 10,
  },
  watchListContainer: {
    width: "88%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.border,
    backgroundColor: "white",
  },
});

export default WatchList;
