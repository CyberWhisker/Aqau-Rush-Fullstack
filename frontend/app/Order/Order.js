import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TopBar from '../../components/TopBar'
import { AntDesign} from '@expo/vector-icons';
import HomeImg from '../../assets/images/home.jpg';
import Data from './data.json'
import { FontAwesome6, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import HomeItem from '../../assets/images/item.jpg';
import BottomBar from '../../components/BottomBar';
import { Link } from 'expo-router';

const navigation = [{title: 'All'},{title: 'Unpaid'},{title: 'To Ship'},{title: 'Shipped'}]

export default function Order() {
  return (
    <View style={{flex: 1}}>
      <TopBar>
        <Link href={'/Profile/Profile'}>
          <AntDesign name="arrowleft" size={30} color="white" />
        </Link>
        <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 30, color: 'white'}}>My Orders</Text>
        <Text></Text>
      </TopBar>
      <View style={{padding: 10, borderBottomWidth: 1, borderColor: '#AAAAAA'}}>
        <FilterNav/>
      </View>
      <ScrollView>
        <View style={{padding: 10, borderBottomWidth: 5, borderBlockColor: '#DADADA'}}>
          <Card/>
        </View>
        <View style={{paddingHorizontal: 10, height: '42%'}}>
          <List/>
        </View>
      </ScrollView>
      <BottomBar/>
    </View>
  )
}

function FilterNav() {
  const [active, setActive] = useState('')
  return (
    <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
      {navigation.map((item, index) => (
        <Pressable onPress={() => setActive(index)} style={{width: '100%', flex: 1,}}>
          <Text key={index} style={[active == index && styles.active, {textAlign: 'center'}]}>
            {item.title}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}

function Card() {
  return(
    <View style={{
      width: '100%',
      borderRadius: 10,
      padding: 20,
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5, // for Android shadow
      marginVertical: 10,
      justifyContent: 'space-between',
      flexDirection: 'row'
      }}>
      <View>
        <Text style={{fontFamily: 'Poppins-Bold', fontSize: 25, color: '#625D5D'}}>Best Delivery App </Text>
        <Text style={{fontFamily: 'Poppins-Bold', fontSize: 12, color: '#6796DC'}}>100% safe and clean water</Text>
      </View>
      <View>
        <Image source={HomeImg} style={{height: 70, width: 70}}/>
      </View>
    </View>
  )
}

function List() {
  return(
    <>
      {Data.map((item, index) => (
        <View style={{marginTop: 30}} key={index}>
          <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
            <Text style={{fontFamily: 'Poppins-Bold'}}>Order Completed</Text>
          </View>
          <View style={{backgroundColor: '#DADADAA1', padding: 15, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: "center"}}>
              <FontAwesome6 name="truck-fast" size={24} color="black" />
              <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, marginLeft: 15}}>Date</Text>
            </View>
            <FontAwesome5 name="greater-than" size={24} color="black" />
          </View>
          <View style={{padding: 20, flexDirection: 'row'}}>
            <View style={{
              padding: 10, 
              borderRadius: 10, 
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5, // for Android shadow
              }}>
                <Image source={HomeItem}/>
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={{fontFamily:'Poppins-Bold', fontSize: 20}}>Name</Text>
              <Text style={{color: '#AAAAAA'}}>Size</Text>
              <Text style={{fontFamily: 'Poppins-Bold', marginTop: 15}}>Price</Text>
            </View>
          </View>
          <View style={{justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
              <Text>Item</Text>
              <Text style={{marginLeft: 10, fontFamily: 'Poppins-Bold', fontSize: 20}}>Price</Text>
          </View>
          <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <View style={{padding: 10, width: 150, borderWidth: 2, borderColor: '#6796DC', marginRight: 10}}>
              <Text style={{textAlign: 'center'}}>Buy Again</Text>
            </View>
            <View style={{padding: 10, width: 150, borderWidth: 2, borderColor: '#6796DC', backgroundColor: '#6796DC'}}>
              <Text style={{textAlign: 'center', color: 'white'}}>Buy Again</Text>
            </View>
          </View>

          <View style={{backgroundColor: '#DADADAA1', padding: 15, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <Text>Quick Review</Text>
            <View style={{flexDirection: 'row',}}>
              <View style={{marginLeft: 2}}>
              <FontAwesome name="star-o" size={24} color="black" />
              </View>
              <View style={{marginLeft: 2}}>
              <FontAwesome name="star-o" size={24} color="black" />
              </View>
              <View style={{marginLeft: 2}}>
              <FontAwesome name="star-o" size={24} color="black" />
              </View>
              <View style={{marginLeft: 2}}>
              <FontAwesome name="star-o" size={24} color="black" />
              </View>
              <View style={{marginLeft: 2}}>
              <FontAwesome name="star-o" size={24} color="black" />
              </View>
            </View>
          </View>
        </View>
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  active: {
    borderBottomWidth: 3,
    borderColor: '#6796DC',
    width: '100%'
  }
})