import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import OnboardingImg from '../../assets/images/onboarding1.jpg'
import { globalStyles } from '../../styles/global'

const Onboarding1 = () => {
  return (
    <View style={styles.container}>
        <Image source={OnboardingImg}/>
        <Text style={globalStyles.font1}>We provide best quality water </Text>
        <Text style={globalStyles.font2}>We are 100% sure that our water is clean and safe to drink with.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 200,
        alignItems: 'center',
        paddingHorizontal: 20,
    }
  });

export default Onboarding1