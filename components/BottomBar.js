import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function BottomBar() {
  return (
    <View style={{flexDirection: 'row', height: 100, backgroundColor: '#6796DC',alignItems: 'center', justifyContent: 'space-evenly'}}>
      <Pressable>
        <FontAwesome name="home" size={30} color="white" />
      </Pressable>
      <Pressable>
        <FontAwesome name="shopping-cart" size={30} color="white" />
      </Pressable>
      <Pressable>
        <FontAwesome name="user" size={30} color="white" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({})