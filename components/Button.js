import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Button(props) {
  return (
    <View style={styles.container}>
        <View style={styles.button}>
            <Text style={styles.label}>{props.children}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        alignItems: 'center',
    },
    button: {
        paddingVertical: 20,
        width: '100%',
        backgroundColor: '#6796DC',
        borderRadius: 20
    },
    label: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})