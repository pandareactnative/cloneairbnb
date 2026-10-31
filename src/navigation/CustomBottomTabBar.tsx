import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon, {IconName} from '../Components/Icon';
import colors from '../styles/colors';
import {scale} from '../styles/responsiveSize';
import styles from '../Components/styles';

const icons: Record<string, IconName> = {
  Explore: 'search',
  Wishlists: 'heart',
  Trips: 'logo',
  Messages: 'message',
  Profile: 'profile',
};

export default function CustomBottomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.tabBar,
        {paddingBottom: Math.max(inset.bottom, scale(10))},
      ]}
    >
      {state.routes.map((route, index) => {
        const active = state.index === index;
        const color = active ? colors.rausch : colors.textSecondary;
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="tab"
            accessibilityLabel={route.name}
            accessibilityState={{selected: active}}
            style={styles.tab}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!active && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
          >
            <View style={styles.tabIcon}>
              <Icon
                name={icons[route.name]}
                size={scale(icons[route.name] === 'logo' ? 23 : 25)}
                color={color}
                strokeWidth={active ? 2 : 1.5}
              />
            </View>
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
