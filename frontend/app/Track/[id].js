import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import BottomBar from '../../components/BottomBar';
import BottomBarId from '../../components/BottomBarId';
import { Link, useLocalSearchParams } from 'expo-router';

const statuses = [
    { label: 'Order Made', icon: 'receipt', description: 'Your order has been confirmed' },
    { label: 'Package Labelled', icon: 'local-offer', description: 'Your good have been packaged and sent to the delivery station' },
    { label: 'Delivering', icon: 'local-shipping', description: '2 stops  (20 min)' },
    { label: 'My Location', icon: 'location-on', description: 'Destination' },
  ];


  const handleFetch = async (orderId, setOrderData) => {
    try {
        const response = await fetch(`http://192.168.1.7:4000/order/single/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setOrderData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default function Track() {
    const {id} = useLocalSearchParams();
    const [orderData, setOrderData] = useState([]);
    // const id = '66517c8e8389d7fddea3bebe';
    useEffect(() => {
        handleFetch(id, setOrderData)
    },[])


    const date = new Date();

    // Array of month names
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // Array of day names
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    // Get the current month name
    const month = months[date.getMonth()];
    // Get the current day name
    const day = days[date.getDay()];
    const dateNum = date.getDate();
    console.log(day)
  return (
    <View style={{flex: 1}}>
        <TopBar>
            <Link href={`/Order/${orderData.userId}`}>
                <AntDesign name="arrowleft" size={30} color="white" />
            </Link>
            <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 30, color: 'white'}}>Track Order</Text>
            <Text></Text>
        </TopBar>
        <ScrollView>
            <View style={{padding: 20, borderBottomWidth: 4, borderColor: '#DADADA'}}>
                <View style={{flexDirection: 'row', justifyContent:'center'}}>
                    <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontSize: 16, fontWeight: '400', color: '#85B6FF'}}>Order Id: {orderData._id}</Text>
                </View>
                <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontSize: 16, fontWeight: '400', marginLeft: 10}}>will be delivered by:</Text>
                <View style={{marginTop: 20}}>
                    <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontSize: 24, fontWeight: '600'}}>{day}, {month}. {dateNum} </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                    <AntDesign name="clockcircleo" size={24} color="black" />
                    <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontSize: 14, fontWeight: '400', color: '#000000'}}>08:45AM - 12:00PM</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                    <Entypo name="location-pin" size={24} color="black" />
                    <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontSize: 16, fontWeight: '400', color: '#707070'}}>{orderData.userData && orderData.userData.address}</Text>
                </View>
            </View>
            <View style={{textAlign: 'center'}}>
                <OrderStatus currentStatusIndex={orderData.status}/>
            </View>
        </ScrollView>
        {id == 'undefined' ? (
            <BottomBar />
        ):(
            <BottomBarId/>
        )}
    </View>
  )
}

function OrderStatus({ currentStatusIndex }) {
    return (
        <View style={styles.container}>
            {statuses.map((status, index) => (
            <View key={index} style={styles.statusContainer}>
                <View style={styles.iconContainer}>
                    <MaterialIcons
                        name={status.icon}
                        size={24}
                        color={index <= currentStatusIndex ? '#3FBDF1' : '#CCC'}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text
                        style={[
                        styles.statusText,
                        index <= currentStatusIndex && styles.activeStatusText,
                        ]}
                    >
                        {status.label}
                    </Text>
                    <Text
                        style={[
                        styles.statusText,
                        index <= currentStatusIndex && styles.activeStatusText,
                        ]}
                    >
                        {status.description}
                    </Text>
                </View>
                {index < statuses.length - 1 && (
                <View style={styles.lineContainer}>
                    <View
                    style={[
                        styles.line,
                        index < currentStatusIndex && styles.activeLine,
                    ]}
                    />
                </View>
                )}
            </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingBottom: 50,
        paddingLeft: '30%',
    },
        statusContainer: {
        flexDirection: 'row',
        marginBottom: 40,
    },
        iconContainer: {
        width: 30,
        alignItems: 'center',
    },
        textContainer: {
        flex: 1,
        marginLeft: 10,
    },
        statusText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        color: '#CCC',
    },
        activeStatusText: {
        color: '#3FBDF1',
        fontWeight: 'bold',
    },
        lineContainer: {
        position: 'absolute',
        top: 35,
        left: 14,
        width: 2,
        height: '100%',
        zIndex: -1,
    },
        line: {
            flex: 1,
            backgroundColor: '#CCC',
        },
        activeLine: {
        backgroundColor: '#3FBDF1',
    },
})