import React, { useState, useEffect } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { useWatchslist } from "../../Contexts/WatchlistContext";
import CoinItem from "../../components/CoinItem";
import { getWatchlistedCoins } from "../../services/request"

const WatchlistScreen = () => {
  const { watchlistCoinIds } = useWatchslist();
  console.log(watchlistCoinIds);

  const [coins, setCoins] = useState ([]);
  const [loading, setLoading] = useState (false);

  const transformCoinIds = () => watchlistCoinIds.join('%2C');

  const fetchWatchlistedCoins = async () =>{
    if(loading) {
      return 
    };
    setLoading(true);
    const watchlistedCoinsData = await getWatchlistedCoins(1, transformCoinIds());
    //console.log(watchlistedCoinsData);
    setCoins(watchlistedCoinsData)
    setLoading(false);
  };

  useEffect(() =>{
    fetchWatchlistedCoins();
  },[]);

  useEffect(() =>{
    fetchWatchlistedCoins();
  },[watchlistCoinIds]);


  return (
    <FlatList 
      data={coins} 
      renderItem={({ item }) => <CoinItem marketCoin={item}/>} 
      refreshControl = {
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={fetchWatchlistedCoins}
        />
      }
    />
  );
};

export default WatchlistScreen;
