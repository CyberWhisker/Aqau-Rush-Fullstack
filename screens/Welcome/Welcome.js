import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WelcomeImg from '../../assets/images/welcome.jpg'
import { globalStyles } from '../../styles/global'
import Button from '../../components/Button'

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <Image source={WelcomeImg}/>
      </View>
      <View>
        <Text style={globalStyles.font3}>Welcome to AQUARUSH</Text>
        <Text style={globalStyles.font2}>Water Delivery app</Text>
      </View>
      <View style={styles.section2}>
        <Button>CREATE AN ACCOUNT</Button>
      </View>
      <View  style={styles.section2}>
        <Button>CREATE AN ACCOUNT</Button>
      </View>
      <View style={styles.section2}>
        <Pressable>
            <Text>Continue as Guest</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    section1: {
        marginTop: 100
    },
    section2: {
        marginTop: 20
    }
})