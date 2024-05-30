import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileImg from '../../assets/images/profile.jpg';
import BottomBar from '../../components/BottomBarId';
import { Link, useLocalSearchParams } from 'expo-router';
import { API_URL } from '@env'; // Import the environment variable

export default function Profile() {
    // const { id } = useLocalSearchParams();
    const id = '6650a1cb80dc922ae072b888';
    const [userData, setUserData] = useState([]);
    console.log(`User ID: ${id}`); // You can use the userId in your component logic
    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (userId) => {
        try {
            const response = await fetch(`${API_URL}/user/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }})
            const data = await response.json()
            setUserData(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const navList = [
        { title: 'My Orders', link: `/Order/${id}`}, 
        { title: 'My address', link: '/Address/Address'},
        { title: 'About', link: '/About/About'},
        { title: 'Terms & Conditions', link: '/Terms/Terms'},
        { title: 'Privacy & Policy', link: '/Privacy/Privacy'},
        { title: 'Health & Support', link: '/Support/Support'},
        { title: 'Log out', link: '/Welcome/Welcome'}]
  return (
    <View style={{flex: 1}}>
        <TopBar>
            <Text></Text>
            <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 30, color: 'white'}}>Profile</Text>
            <Text></Text>
        </TopBar>
        <ScrollView>
            <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: 20}}>
                <View style={{borderRadius: 100, overflow: 'hidden'}}>
                    <Image source={ProfileImg} style={{height: 150, width: 150}}/>
                </View>
            </View>
            <Text style={{textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 30}}>{userData.name}</Text>
            <View style={{marginTop: 20, paddingHorizontal: 30, paddingBottom: 20}}>
                <Navigation navList={navList}/>
            </View>
        </ScrollView>
        <BottomBar userId={id}/>
    </View>
  )
}

function Navigation({navList}) {
    return (
        <View style={{backgroundColor: '#EDE8E8', borderRadius: 10}}>
            {navList.map((item, index) => (
                <Link href={item.link} key={index}>
                    <View style={{padding: 10, width: 350}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingVertical: 3}}>
                            <Text>{item.title}</Text>
                            <MaterialCommunityIcons name="greater-than" size={24} color="black" />
                        </View>
                    </View>
                </Link>
            ))}

        </View>
    )
}

const styles = StyleSheet.create({})