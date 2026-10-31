import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Category} from '../constants/listings';

export type BottomTabParamList = {
  Explore: {category?: Category} | undefined;
  Wishlists: undefined;
  Trips: undefined;
  Messages: undefined;
  Profile: undefined;
};

export type SearchTab = 'homes' | 'experiences' | 'services';

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<BottomTabParamList> | undefined;
  Search: {tab?: SearchTab} | undefined;
  Listing: {id: string};
  Section: {title: string; subtitle?: string; ids: string[]; empty?: string};
};

export type RootNavigation = NativeStackNavigationProp<RootStackParamList>;
export type TabNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList>,
  RootNavigation
>;
