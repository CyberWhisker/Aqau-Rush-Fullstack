import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import OnboardingImg from '../../assets/images/onboarding1.png';
import { globalStyles } from '../../styles/global';
import Button from '../../components/Button';
import { Link } from 'expo-router';

const Onboarding1 = () => {
  return (
    <View style={styles.container}>
        <Image source={OnboardingImg}/>
        <View style={styles.section1}>
          <Text style={globalStyles.font1}>We provide best quality water </Text>
        </View>
        <View style={styles.section2}>
          <Text style={globalStyles.font2}>We are 100% sure that our water is clean and safe to drink with.</Text>
        </View>
        <View style={styles.section3}>
          <View style={styles.progress}>
            <View style={styles.active}></View>
            <View style={styles.bar1}></View>
            <View style={styles.bar1}></View>
          </View>
        </View>
        <View style={styles.section4}>
          <Link href={'/Onboarding/Onboarding2'}>
            <Button>Next</Button>
          </Link>
        </View>
    </View>
  );
}

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        alignItems: 'center',
        paddingHorizontal: 20,
        height: height,
    },
    section1: {
      marginTop: 10,
    },
    section2: {
      marginTop: 20,
    },
    section3: {
      marginTop: 40,
    },
    section4: {
      marginTop: 100,
    },
    bar1: {
      flex: 1,
      height: 4,
      backgroundColor: '#DADADA',
      marginHorizontal: 5,
    },
    progress: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 20,
    },
    active: {
      flex: 1,
      height: 4,
      backgroundColor: '#6796DC',
      marginHorizontal: 5,
    },
  });

export default Onboarding1;
