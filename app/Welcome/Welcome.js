import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WelcomeImg from '../../assets/images/welcome.jpg'
import { globalStyles } from '../../styles/global'
import Button from '../../components/Button'
import { Link } from 'expo-router'

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
        <Link href={'/Auth/Register'}>
          <Button>CREATE AN ACCOUNT</Button>
        </Link>
      </View>
      <View  style={styles.section2}>
        <Link href={'/Auth/Login'}>
          <Button>LOG IN</Button>
        </Link>
      </View>
      <View style={styles.section2}>
          <Link href={'/Home/Home'}>
            <Text>Continue as Guest</Text>
          </Link>
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