import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Onboarding1 from './screens/Onboarding/Onboarding1';
import Onboarding2 from './screens/Onboarding/Onboarding2';
import Onboarding3 from './screens/Onboarding/Onboarding3';
import Welcome from './screens/Welcome/Welcome';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import Home from './screens/Home/Home';
import Cart from './screens/Cart/Cart';
import Checkout from './screens/Checkout/Checkout';
import Test from './screens/Test';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import OrderSuccess from './screens/OrderSuccess/OrderSuccess';
import Track from './screens/Track/Track';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Track />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
