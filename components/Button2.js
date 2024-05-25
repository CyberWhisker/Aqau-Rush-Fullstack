import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Button2(props) {
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
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 10,
        width: '100%',
        backgroundColor: '#6796DC',
        borderRadius: 20
    },
    label: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})