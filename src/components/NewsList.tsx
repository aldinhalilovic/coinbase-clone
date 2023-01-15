import React, { FC } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import News from "../models/News";
import NewsListItem from "./NewsListItem";

interface NewsProps {
  newsData: News[];
  isHomeScreen: boolean;
  viewMoreHandler?: any;
}

const NewsList: FC<NewsProps> = ({
  newsData,
  isHomeScreen,
  viewMoreHandler,
}) => {
  return (
    <View style={{ width: "100%", alignSelf: "flex-start" }}>
      {isHomeScreen && (
        <View style={styles.listHeader}>
          <Text style={styles.newsText}>News</Text>
          <TouchableOpacity onPress={viewMoreHandler}>
            <Text style={styles.viewMoreButton}>View More</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={isHomeScreen ? newsData.slice(0, 5) : newsData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.url}
        style={{ marginHorizontal: 8 }}
        renderItem={({ item }) => {
          return (
            <NewsListItem
              newsOutlet={item.newsOutlet}
              date={item.date}
              image={item.image}
              title={item.title}
              url={item.url}
            />
          );
        }}
      />
    </View>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 10,
    marginHorizontal: "6%",
  },
  newsText: {
    fontSize: 20,
    fontWeight: "600",
  },
  viewMoreButton: {
    color: Colors.cbBlue,
    fontSize: 18,
    fontWeight: "600",
  },
});
