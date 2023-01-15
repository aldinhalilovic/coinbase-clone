import React, { FC } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import Colors from "../constants/Colors";

interface TopMoversListItemProps {
  id: number;
  symbol: string;
  price: number;
  percentChange: number;
}

const TopMoversListItem: FC<TopMoversListItemProps> = ({
  id,
  symbol,
  price,
  percentChange,
}) => {
  const animatedValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
    <TouchableHighlight
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      underlayColor="FAFBFE"
      style={{ width: 143, marginRight: 17 }}
    >
      <Animated.View style={[styles.listItem, animatedStyle]}>
        <Image
          style={styles.logo}
          source={{
            uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id.toString()}.png`,
          }}
        />
        <View>
          <Text style={styles.tickerText}>{symbol}</Text>
          <Text style={styles.priceText}>
            $
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
        <View>
          <Text
            style={[
              {
                color:
                  percentChange > 0 ? Colors.positiveGreen : Colors.negativeRed,
              },
              styles.changeText,
            ]}
          >
            {percentChange > 0 ? "+" : ""}
            {percentChange.toLocaleString()}%
          </Text>
        </View>
      </Animated.View>
    </TouchableHighlight>
  );
};

export default TopMoversListItem;

const styles = StyleSheet.create({
  listItem: {
    width: 143,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 25,
  },
  logo: {
    width: 32,
    height: 32,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  tickerText: {
    fontSize: 15,
    fontWeight: "600",
    marginRight: 5,
  },
  priceText: {
    fontSize: 15,
    color: Colors.secondarySubtitle,
  },
  changeText: {
    fontSize: 26,
    marginTop: 2,
  },
});
