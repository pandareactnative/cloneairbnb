import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Listing, Search, Section} from '../Screens';
import {AppProvider} from '../store/AppContext';
import {RootStackParamList} from './types';
import names from './navigationStrings';
import TabRoutes from './TabRoutes';
import colors from '../styles/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();
const theme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, background: colors.white},
};

export default function Routes() {
  return (
    <AppProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: colors.white},
          }}
        >
          <Stack.Screen name={names.TABS} component={TabRoutes} />
          <Stack.Screen
            name={names.SEARCH}
            component={Search}
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
              contentStyle: {backgroundColor: 'transparent'},
            }}
          />
          <Stack.Screen name={names.LISTING} component={Listing} />
          <Stack.Screen name={names.SECTION} component={Section} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
