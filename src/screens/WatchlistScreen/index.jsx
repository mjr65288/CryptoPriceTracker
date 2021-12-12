import React from "react";
import { View, Text } from "react-native";
import { useWatchslist } from "../../Contexts/WatchlistContext";
import CoinItem from "../../components/CoinItem"

const WatchlistScreen = () => {
  const { value } = useWatchslist();
  console.log(value);
  return (
    <View>
      <Text style={{ color: "white" }}>Hello</Text>
    </View>
  );
};

export default WatchlistScreen;
