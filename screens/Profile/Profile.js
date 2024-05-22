import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopBar from '../../components/TopBar'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileImg from '../../assets/images/profile.jpg';
import BottomBar from '../../components/BottomBar';

const navList = [
    { title: 'My Orders'}, 
    { title: 'My address'},
    { title: 'About'},
    { title: 'Terms & Conditions'},
    { title: 'Privacy & Policy'},
    { title: 'Health & Support'},
    { title: 'Log out'}]

export default function Profile() {
  return (
    <View style={{flex: 1}}>
        <TopBar>
            <AntDesign name="arrowleft" size={30} color="white" />
            <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 30, color: 'white'}}>Track Order</Text>
            <Text></Text>
        </TopBar>
        <ScrollView>
            <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: 20}}>
                <View style={{borderRadius: 100, overflow: 'hidden'}}>
                    <Image source={ProfileImg} style={{height: 150, width: 150}}/>
                </View>
            </View>
            <Text style={{textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 30}}>User Name</Text>
            <View style={{marginTop: 20, paddingHorizontal: 30, paddingBottom: 20}}>
                <Navigation/>
            </View>
        </ScrollView>
        <BottomBar/>
    </View>
  )
}

function Navigation() {
    return (
        <View style={{backgroundColor: '#EDE8E8', borderRadius: 10}}>
            {navList.map((item, index) => (
                <View key={index} style={{padding: 10}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingVertical: 3}}>
                        <Text>{item.title}</Text>
                        <MaterialCommunityIcons name="greater-than" size={24} color="black" />
                    </View>
                </View>
            ))}

        </View>
    )
}

const styles = StyleSheet.create({})