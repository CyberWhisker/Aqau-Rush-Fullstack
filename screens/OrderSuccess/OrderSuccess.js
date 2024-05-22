import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SuccessImage from '../../assets/images/success.jpg';
import Button from '../../components/Button';

export default function OrderSuccess() {
  return (
    <View style={{flex: 1, paddingHorizontal: 20}}>
        <View style={{marginTop: '40%'}}>
            <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontWeight: '500', fontSize: '30px', color: '#707070'}}>Order Id: 0123457</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: '25%'}}>
            <Image source={SuccessImage} style={{ width: 180, height: 180,}} />
        </View>
        <View style={{marginTop: 20}}>
            <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontWeight: '700', fontSize: '30px', color: '#707070'}}>Order Successful</Text>
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
            <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontWeight: '400', fontSize: '12px', color: '#707070'}}>Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut.</Text>
        </View>
        <View style={{marginTop: 20}}>
            <Button>Continue Shopping</Button>
        </View>
        <View style={{marginTop: 20}}>
            <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontWeight: '700', fontSize: 20, color: '#707070'}}>Track Order</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})