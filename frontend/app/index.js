import React, { useCallback, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Onboarding1 from './Onboarding/Onboarding1';
// import Cart from './Cart/[id]';
import Register from './Auth/Register';
// import Checkout from './Checkout/[id]';
// import Order from './Order/[id]';
// import Profile from './Profile/[id]';
// import Track from './Track/[id]';

import Welcome from './Welcome/Welcome';
import Checkout from './Checkout/Checkout';
import Track from './Track/Track';
import Order from './Order/Order';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (fontError) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Error loading fonts.</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container} onLayout={onLayoutRootView}>
        {/* <Onboarding1/> */}
        <Onboarding1/>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
