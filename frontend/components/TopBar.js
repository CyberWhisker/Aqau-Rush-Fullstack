import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function TopBar(props) {
  return (
    <View style={{flexDirection: 'row', height: '20%', backgroundColor: '#6796DC', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50, paddingHorizontal: 30}}>
        {props.children}
    </View>
  )
}

const styles = StyleSheet.create({})