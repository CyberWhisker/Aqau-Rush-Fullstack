import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export default function Input(props) {
  return (
    <View>
      <TextInput placeholder={props.placeholder} style={styles.input}/>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 15
    }
})