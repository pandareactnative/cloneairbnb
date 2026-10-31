import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Explore, Messages, Profile, Trips, Wishlists} from '../Screens';
import {BottomTabParamList} from './types';
import CustomBottomTabBar from './CustomBottomTabBar';
import names from './navigationStrings';
import colors from '../styles/colors';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const renderTabs = (props: BottomTabBarProps) => (
  <CustomBottomTabBar {...props} />
);

export default function TabRoutes() {
  return (
    <Tab.Navigator
      tabBar={renderTabs}
      screenOptions={{
        headerShown: false,
        sceneStyle: {backgroundColor: colors.white},
      }}
    >
      <Tab.Screen name={names.EXPLORE} component={Explore} />
      <Tab.Screen name={names.WISHLISTS} component={Wishlists} />
      <Tab.Screen name={names.TRIPS} component={Trips} />
      <Tab.Screen name={names.MESSAGES} component={Messages} />
      <Tab.Screen name={names.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
}
