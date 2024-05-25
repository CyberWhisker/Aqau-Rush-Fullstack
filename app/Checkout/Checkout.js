import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TopBar from '../../components/TopBar'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import HomeItem from '../../assets/images/item.jpg';
import Data from './data.json';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Button2 from '../../components/Button2';
import { Link } from 'expo-router';
export default function Checkout() {
    const [toggleStandard, setToggleStandard] = useState(true);
    const [toggleSchedule, setToggleSchedule] = useState(false);
    const [toggleModal, setToggleModal] = useState(false);
    const [selected, setSelected] = useState('');
    console.log(selected)
  return (
    <View style={{flex: 1}}>
        <TopBar>
            <Link href={'/Cart/Cart'}>
                <Link>
                    <AntDesign name="arrowleft" size={30} color="white" />
                </Link>
            </Link>
            <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 30, color: 'white'}}>Checkout</Text>
            <Text></Text>
        </TopBar>
        <View style={{height: 200, borderBottomWidth: 5, borderColor: '#DADADA'}}>
            <List/>
        </View>
        <ScrollView>
            <View style={{justifyContent: 'space-between', padding: 20, flexDirection: 'row', borderBottomWidth: 5, borderColor: '#DADADA'}}>
                <View>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#625D5D'}}>Sub Total</Text>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#625D5D'}}>Sub Total</Text>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#2F8308', marginTop: 20}}>Sub Total</Text>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '600', fontSize: 10, color: '#AAAAAA', marginTop: 20, marginTop: 0}}>will be debited from wallet on each delivery </Text>
                </View>
                <View>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#625D5D'}}>₱ 40.00</Text>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#625D5D'}}>₱ 10.00</Text>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#2F8308', marginTop: 20}}>₱ 50.00</Text>
                </View>
            </View>
            <View style={{padding: 20, borderBottomWidth: 5, borderColor: '#DADADA'}}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#AAAAAA'}}>Delivery Address</Text>
                    <View style={{ borderBottomWidth: 2, borderColor: '#6796DC'}}>
                        <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#6796DC'}}>Change</Text>
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15}}>Kizha Pevidal</Text>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '400', fontSize: 15}}>Santa Cruz Marinduque</Text>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, marginTop: 20}}>08120076547</Text>
                </View>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 20}}>
                    <CardSample>
                        <Pressable onPress={() => [setToggleStandard(true),setToggleSchedule(false)] } style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <View>
                                <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 13}}>Standard</Text>
                                <Text style={{fontFamily: 'Poppins', fontWeight: '400', fontSize: 13}}>10-20 Min</Text>
                            </View>
                            <CheckBox toggleCheckBox={toggleStandard}/>
                        </Pressable>
                    </CardSample>
                    <CardSample>
                        <Pressable style={{justifyContent: 'space-between', flexDirection: 'row'}} onPress={() => [setToggleStandard(false),setToggleSchedule(true), setToggleModal(true)]}>
                            <View>
                                <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 13}}>Schedule Ahead</Text> 
                                <Text style={{fontFamily: 'Poppins', fontWeight: '400', fontSize: 13}}>Choose Your Time</Text> 
                            </View>
                            <CheckBox toggleCheckBox={toggleSchedule}/>
                        </Pressable>
                    </CardSample>
                </View>
            </View>
            {toggleSchedule && (
                <View>
                    <Calendar
                        onDayPress={day => {
                            setSelected(day.dateString);
                        }}
                        markedDates={{
                            [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                        }}
                    />
                    <View style={{marginTop: 5}}>
                        <Time/>
                    </View>
                </View>
            )}
            <View style={{padding: 20, borderBottomWidth: 5, borderColor: '#DADADA'}}>
                <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#AAAAAA'}}>Delivery Address</Text>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome name="money" size={24} color="black" />
                        <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#AAAAAA', marginLeft: 10}}>Cash on delivery</Text>
                    </View>
                    <CheckBox toggleCheckBox={true}/>
                </View>
            </View>
            <View style={{padding: 20, borderBottomWidth: 5, borderColor: '#DADADA'}}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15}}>Total (2 items)</Text>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15}}>₱ 50.00</Text>
                </View>
                <View style={{marginTop: 20, justifyContent: 'center', flexDirection: 'row'}}>
                    <Link href={'/OrderSuccess/OrderSuccess'}>
                        <ButtonStyle>Place Order</ButtonStyle>
                    </Link>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

function List() {
    return (
        <>
            <FlatList data={Data} renderItem={({item}) => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderBottomWidth: 4, padding: 10, borderColor: '#DADADA'}}>
                    <View style={{flex: 1, height: '100%'}}>
                        <View style={{ width: 70, shadowOpacity: 0.4, shadowOffset: {height: 0, width: 2}}}>
                            <View>
                                <Image source={HomeItem} style={{borderRadius: 10}} />
                                <View style={{borderRadius: 100, backgroundColor: '#6796DC', position: 'absulote', top: -20, left: 1, width: '90%'}}>
                                    <Text style={{textAlign: 'center', color: 'white', fontWeight: '600'}}>{item.size} L</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 2}}>
                        <View>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.name}</Text>
                            <Text style={{fontSize: 13, fontWeight: 'bold', color: '#AAAAAA'}}>{item.size} Liter</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>₱ {item.price}.00</Text>
                    </View>
                </View>
            )}/>
        </>
    )
}

function CardSample(props) {
    return(
        <View style={{borderWidth: 2, width: '100%', flex: 1, borderRadius: 10, padding: 10, marginHorizontal: 5}}>
            {props.children}
        </View>
    )
}

function CheckBox({toggleCheckBox}) {
    return(
        <View style={{ borderWidth: 2, padding: 2, height: 30, width: 30, borderRadius: 15, borderColor: '#AAAAAA', justifyContent: 'center', alignItems: 'center' }}>
            {toggleCheckBox && (
                <View style={{ height: '100%', width: '100%', borderRadius: 15, backgroundColor: '#6796DC' }} />
            )}
        </View>
    )
}

function Time() {
    const [time, setTime] = useState('');
    const [active, setActive] = useState(false);
    const times = ['08:00', '08:45', '08:50'];
    return(
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            {times.map((item, index) => (
                <Pressable onPress={()=>setTime(index)}>
                    <View key={index} style={time == index ? styles.active : styles.inactive}>
                        <Text style={{fontFamily: 'Poppins', fontWeight: '400', fontSize: 20}}>{item}</Text>
                    </View>
                </Pressable>
            ))}
        </View>
    )
}

function ButtonStyle(props) {
    return(
        <View style={styles.container}>
            <View style={styles.button}>
                <Text style={styles.label}>{props.children}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inactive: {
        borderRadius: 10, 
        padding: 20, 
        backgroundColor: '#F8F6F6'
    },
    active: {
        borderRadius: 10, 
        padding: 20, 
        backgroundColor: '#3FBDF1'
    },
    container: {
        width: 300,
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