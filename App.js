import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Onboarding1 from './screens/Onboarding/Onboarding1';
import Onboarding2 from './screens/Onboarding/Onboarding2';
import Onboarding3 from './screens/Onboarding/Onboarding3';
import Welcome from './screens/Welcome/Welcome';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import Home from './screens/Home/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <Home/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
