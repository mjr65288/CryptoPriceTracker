import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TextInput, ActivityIndicator } from "react-native";
//import Coin from "../../../assets/data/crypto.json";
import CoinDetailedHeader from "./components/CoinDetailedHeader";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useRoute } from "@react-navigation/core";
import { getDetailsCoinsData, getCoinMarketChart } from "../../services/request";

const CoinDetailedScreen = () => {  
  
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const route = useRoute();
  const { params: { coinId }} = route;

  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  //const [usdValue, setUsdValue] = useState(usd.toString());
  const [usdValue, setUsdValue] = useState("");

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchCoinData = await getDetailsCoinsData(coinId);
    //console.log(fetchCoinData);
    const fetCoinMarketData = await getCoinMarketChart(coinId)
    //console.log(fetCoinMarketData)
    setCoin(fetchCoinData);
    setCoinMarketData(fetCoinMarketData)
    setUsdValue(fetchCoinData.market_data.current_price.usd.toString());
    setLoading(false);
  };

  useEffect(()=>{
    fetchCoinData();
  },[]);

  if(loading || !coin || !coinMarketData){
    return <Text>Loading Data</Text> //<ActivityIndicator size="small" />;
  }

  const {
    id,
    image: { small },
    name,
    symbol,
    market_data: {
      market_cap_rank,
      current_price: { usd },
      price_change_percentage_24h,
    },
  } = coin;

  const { prices } = coinMarketData

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";
  const chartColor = usd > prices[0][1] ? "#16c784" : "#ea3943";
  const { width: SIZE } = Dimensions.get("window");

  const formatCurrecy = (value) => {
    "worklet";
    if (value === "") {
      return `$${usd.toFixed(2)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const changeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setUsdValue((floatValue * usd).toString());
    //console.warn(typeof value);
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / usd).toString());
    //console.warn(typeof value);
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <ChartPathProvider
        data={{
          //points: prices.map((price) => ({ x: price[0], y: price[1] })),
          //distracturing, spreading, restoperator
          points: prices.map(([x, y]) => ({ x, y })),
          smoothingStrategy: "bezier",
        }}
      >
        <CoinDetailedHeader
          coinId = {id}
          image={small}
          name={name}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <ChartYLabel format={formatCurrecy} style={styles.currentPrice} />
            {/* <Text style={styles.currentPrice}>${usd}</Text> */}
          </View>
          <View
            style={{
              backgroundColor: percentageColor,
              paddingHorizontal: 3,
              paddingVertical: 8,
              flexDirection: "row",
            }}
          >
            <AntDesign
              name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
              size={12}
              color={"white"}
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View>
          <ChartPath
            strokeWidth={2}
            height={SIZE / 2}
            stroke={chartColor}
            width={SIZE}
          />
          <ChartDot style={{ backgroundColor: chartColor }} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            ></TextInput>
          </View>

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            ></TextInput>
          </View>
        </View>
      </ChartPathProvider>
    </View>
  );
};

export default CoinDetailedScreen;
