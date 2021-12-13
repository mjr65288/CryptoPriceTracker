import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useWatchslist } from "../../../../Contexts/WatchlistContext";

const CoinDetailedHeader = (props) => {
  const { coinId, image, name, symbol, marketCapRan } = props;
  const navigation = useNavigation();
  const { watchlistCoinIds, storeWatchlistCoinId, removeWatchlistCoinId } = useWatchslist();

  const checkIfCoinIsWatchlisted = () =>
    watchlistCoinIds.some((coinIdValue) => coinIdValue === coinId);

  const handleWatchlistCoin = () =>{
    if(checkIfCoinIsWatchlisted()){
      return  removeWatchlistCoinId(coinId);
    };
    return storeWatchlistCoinId(coinId);
  };

  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={{ color: "white" }}>#{marketCapRan}</Text>
        </View>
      </View>
      <FontAwesome
        name={checkIfCoinIsWatchlisted() ? "star" : "star-o"}
        size={30}
        color={checkIfCoinIsWatchlisted() ? "#FFBF00" : "white"}
        onPress = {handleWatchlistCoin}
      />
    </View>
  );
};

export default CoinDetailedHeader;
