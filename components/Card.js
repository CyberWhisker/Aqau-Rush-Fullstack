import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Card(props) {
  return (
    <View style={styles.card}>
      <Text>{props.children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        borderRadius: '10%',
        padding: 20,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 14
    }
})