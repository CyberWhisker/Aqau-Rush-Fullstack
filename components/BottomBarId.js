import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function BottomBar({userId}) {
  return (
    <View style={{flexDirection: 'row', height: 100, backgroundColor: '#6796DC',alignItems: 'center', justifyContent: 'space-evenly'}}>
      <Link href={`/Home/${userId}`}>
        <FontAwesome name="home" size={30} color="white" />
      </Link>
      <Link href={`/Cart/${userId}`}>
        <FontAwesome name="shopping-cart" size={30} color="white" />
      </Link>
      <Link href={`/Profile/${userId}`}>
        <FontAwesome name="user" size={30} color="white" />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({})