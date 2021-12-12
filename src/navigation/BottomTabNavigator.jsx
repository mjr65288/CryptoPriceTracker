import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from '@expo/vector-icons';
import WatchlistScreen from "../screens/WatchlistScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle:{
            backgroundColor:'#181818'
        },
        tabBarIcon: ({ focused, color }) => {
            let iconName;
  
            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } 
          else if (route.name === 'Watchlist') {
              iconName = focused ? 'ios-star' : 'ios-star-outline';
          }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={focused?30:25} color={color} />
          },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Watchlist" component={WatchlistScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
