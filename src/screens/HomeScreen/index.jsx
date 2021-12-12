import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import CoinItem from "../../components/CoinItem";
import Cryptocurrencies from "../../../assets/data/cryptocurrencies.json";
import { getMarketData } from "../../services/request";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loadig, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loadig) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);

    setCoins((existingCoins) => ([...existingCoins, ...coinsData]));
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loadig) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  //   return (
  //     <FlatList
  //       data={Cryptocurrencies}
  //       renderItem={({ item }) => <CoinItem marketCoin={item} />}
  //     />
  //   );
  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
    //   onEndReached={() => console.log('end')}
      onEndReached={() => fetchCoins((coins.length / 25) + 1)}
      refreshControl={
        <RefreshControl
          refreshing={loadig}
          tintColor="white"
          onRefresh={refetchCoins}
        />
      }
    />
  );
};

export default HomeScreen;
