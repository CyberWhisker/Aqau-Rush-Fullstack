import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TopBar from '../../components/TopBar'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Data from './data.json';
import HomeItem from '../../assets/images/item.jpg';
import Button2 from '../../components/Button2';
import { Link } from 'expo-router';

export default function Cart() {
  return (
    <View style={{flex: 1}}>
      <TopBar>
        <Link href={'/Home/Home'}>
            <AntDesign name="arrowleft" size={30} color="white" />
        </Link>
        <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 30, color: 'white'}}>Shopping cart</Text>
        <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: 'white'}}>Edit</Text>
      </TopBar>
      <View style={{height: '65%'}}>
        <List/>
      </View>
      <Checkout/>
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
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 2, justifyContent: 'space-between', flexDirection: 'col'}}>
                        <View>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.name}</Text>
                            <Text style={{fontSize: 13, fontWeight: 'bold', color: '#AAAAAA'}}>{item.size} Liter</Text>
                        </View>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>₱ {item.price}.00</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Ionicons name="add-circle-sharp" size={29} color="black" />
                            <Text style={{fontWeight: '600', fontFamily: 'Poppins', color: '#7D7D7D'}}>02</Text>
                            <AntDesign name="minuscircle" size={24} color="black" />
                        </View>
                    </View>
                </View>
            )}/>
        </>
    )
}

function Checkout() {
    const [toggleCheckBox, setToggleCheckBox] = useState(true);

    return (
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center', borderTopWidth: 4, borderColor: '#DADADA', flexDirection: 'row', paddingHorizontal: 20}}>
            <Pressable onPress={() => setToggleCheckBox(!toggleCheckBox)} style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{ borderWidth: 2, padding: 2, height: 30, width: 30, borderRadius: 15, borderColor: '#AAAAAA', justifyContent: 'center', alignItems: 'center' }}>
                    {toggleCheckBox && (
                        <View style={{ height: '100%', width: '100%', borderRadius: 15, backgroundColor: '#6796DC' }} />
                    )}
                </View>
                <Text style={{marginLeft: 5, color: '#AAAAAA', fontFamily: 'Poppins', fontWeight: '600'}}>Select All</Text>
            </Pressable>
            <Text style={{flex: 1, fontFamily: 'Poppins', fontWeight: '600', fontSize: 17, textAlign: 'center'}}>₱ 70.00</Text>
            <View style={{flex: 1}}>
                <Link href={'/Checkout/Checkout'}>
                    <ButtonStyle>Checkout</ButtonStyle>
                </Link>
            </View>
        </View>
    );
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
    container: {
        width: 120,
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