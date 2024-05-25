import { Alert, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import { AntDesign} from '@expo/vector-icons';
import HomeImg from '../../assets/images/home.jpg';
import Data from './data.json'
import { FontAwesome6, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import HomeItem from '../../assets/images/item.jpg';
import BottomBar from '../../components/BottomBar';
import { Link, useLocalSearchParams } from 'expo-router';
import BottomBarId from '../../components/BottomBarId';

const handleSubmit = async (userId, itemId) => {
  try {
      const response = await fetch('http://192.168.1.7:4000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          itemId: itemId,
          quantity: 1
        })
      });

      if (response.ok) {
        Alert.alert(
          "Success",
          "Item added to cart",
          [
            {text:"Ok"}
          ]
        );
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
}

const handleFetch = async (userId, setOrderData) => {
  try {
      const response = await fetch(`http://192.168.1.7:4000/order/${userId}`, {
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



const updateReview = async (id, rating) => {
  console.log(id, rating)
  try {
    const response = await fetch(`http://192.168.1.7:4000/review/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating : rating
      })
    });
    if (response.ok) {
      Alert.alert(
        "Success",
        "Updated review successfully",
        [
          {text:"Ok"}
        ]
      );
    } else {
      console.log('Failed to Review update');
    }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

export default function Order() {
  const [active, setActive] = useState(0)
  // const {id} = useLocalSearchParams();
  const id = '6650a1cb80dc922ae072b888';
  const [orderData, setOrderData] = useState([]);
  useEffect(()=> {
    handleFetch(id, setOrderData)
  },[])
    const navigation = [{title: 'All'},{title: 'Unpaid'},{title: 'To Ship'},{title: 'Shipped'}]
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
        <FilterNav navigation={navigation} setActive={setActive} active={active}/>
      </View>
      <ScrollView>
        <View style={{padding: 10, borderBottomWidth: 5, borderBlockColor: '#DADADA'}}>
          <Card/>
        </View>
        <View style={{paddingHorizontal: 10, height: '42%'}}>
        <List orderData={orderData} active={active} setOrderData={setOrderData} />
        </View>
      </ScrollView>
      {id == 'undefined' ? (
        <BottomBar/>
      ) : (
        <BottomBarId userId={id}/>
      )}
    </View>
  )
}

function FilterNav({navigation, setActive, active}) {
  const toggle = (index) => {
    setActive(index)
  }
  console.log(active)
  return (
    <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
      {navigation.map((item, index) => (
        <Pressable onPress={() => toggle(index)} style={{width: '100%', flex: 1, borderRadius: 10, overflow: 'hidden'}} key={index}>
          <Text style={[active == index && styles.active, {textAlign: 'center'}]}>
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

function List({orderData, active, setOrderData }) {
  const submitReview = async (userId, itemId, review, rating, reviewData) => {
    if (reviewData === undefined) {
      try {
        const response = await fetch(`http://192.168.1.7:4000/review`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId,
            itemId: itemId,
            review: review,
            rating: rating
          })
        });
        if (response.ok) {
          Alert.alert(
            "Success",
            "Submitted review successfully",
            [
              { text: "Ok" }
            ]
          );
          handleFetch(userId, setOrderData); // Refresh data after successful submission
        } else {
          console.log('Failed to submit review');
        }
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    } else {
      updateReview(reviewData._id, rating);
      handleFetch(userId, setOrderData); // Refresh data after updating review
    }
  }

  let date = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  console.log(month, date, year)
  const [filter, setFilter] = useState(1)
  const [secondFilter, setSecondFilter] = useState(1)
  useEffect(() => {
    if (active == 0) {
      setFilter(0) 
      setSecondFilter(1) 
    }
    if (active == 1) {
      setFilter(0) 
      setSecondFilter(1) 
    }
    if (active == 2) {
      setFilter(3) 
      setSecondFilter(3) 
    }
    if (active == 3) {
      setFilter(4) 
      setSecondFilter(4) 
    }
  },[active])
  
  if (orderData.filter(item => item.status == filter || item.status == secondFilter).length == 0) {
    return (
      <Text style={{fontFamily: 'Poppins-Bold', fontSize: 40, color: 'red', textAlign: 'center', marginTop: 40}}>Order is Empty</Text>
    )
  } else {
    return(
      <>
        {orderData.filter(item => item.status == filter || item.status == secondFilter).map((item, index) => (
          <>
            <View style={{marginTop: 30}} key={index}>
              <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
                <Text style={{fontFamily: 'Poppins-Bold'}}>
                  {item.status == 0 && 'Unpaid'}
                  {item.status == 1 && 'Unpaid'}
                  {item.status == 2 && 'To Ship'}
                  {item.status == 3 && 'Shipped'}
                  </Text>
              </View>
              
              <Link href={`/Track/${item._id}`}>
                <View style={{backgroundColor: '#DADADAA1', padding: 15, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: "center", width: '100%'}}>
                    <FontAwesome6 name="truck-fast" size={24} color="black" />
                    {!item.date ? (
                      <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, marginLeft: 15}}>{month}-{date}-{year}</Text>
                    ):(
                      <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, marginLeft: 15}}>{item.date}</Text>
                    )}
                  </View>
                  <FontAwesome5 name="greater-than" size={24} color="black" />
                </View>
              </Link>
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
                  <Text style={{fontFamily:'Poppins-Bold', fontSize: 20}}>{item.itemDetail.name}</Text>
                  <Text style={{color: '#AAAAAA'}}>{item.itemDetail.size} L</Text>
                  <Text style={{fontFamily: 'Poppins-Bold', marginTop: 15}}>₱ {item.itemDetail.price}</Text>
                </View>
              </View>
              <View style={{justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
                  <Text>{item.quantity}x Item</Text>
                  <Text style={{marginLeft: 10, fontFamily: 'Poppins-Bold', fontSize: 20}}>₱ {item.itemDetail.price * item.quantity}</Text>
              </View>
              {item.status == 0 && (
                <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Pressable onPress={() => handleSubmit(item.userId, item.itemId)}>
                    <View style={{padding: 10, width: 150, borderWidth: 2, borderColor: '#6796DC', marginRight: 10}}>
                      <Text style={{textAlign: 'center'}}>Buy Again</Text>
                    </View>
                  </Pressable>
                  <View style={{padding: 10, width: 150, borderWidth: 2, borderColor: '#6796DC', backgroundColor: '#6796DC'}}>
                    <Text style={{textAlign: 'center', color: 'white'}}>Write Review</Text>
                  </View>
                </View>
              )}
  
              <View style={{backgroundColor: '#DADADAA1', padding: 15, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                <Text>Quick Review</Text>
                <View style={{flexDirection: 'row',}}>
                  <View style={{marginLeft: 2}}>
                    <Pressable onPress={() => submitReview(item.userId, item.itemId, 'None', 1, item.reviewDetail)}>
                      {item.reviewDetail && (
                        item.reviewDetail.rating > 0 ? (
                          <FontAwesome name="star" size={24} color="black" />
                        ) : (
                          <FontAwesome name="star-o" size={24} color="black" />
                        )
                      )}
                      {!item.reviewDetail && (
                        <FontAwesome name="star-o" size={24} color="black" />
                      )}
                    </Pressable>
                  </View>
                  <View style={{marginLeft: 2}}>
                    <Pressable onPress={() => submitReview(item.userId, item.itemId, 'None', 2, item.reviewDetail)}>
                      {item.reviewDetail && (
                        item.reviewDetail.rating > 1 ? (
                          <FontAwesome name="star" size={24} color="black" />
                        ) : (
                          <FontAwesome name="star-o" size={24} color="black" />
                        )
                      )}
                      {!item.reviewDetail && (
                        <FontAwesome name="star-o" size={24} color="black" />
                      )}
                    </Pressable>
                  </View>
                  <View style={{marginLeft: 2}}>
                    <Pressable onPress={() => submitReview(item.userId, item.itemId, 'None', 3, item.reviewDetail)}>
                      {item.reviewDetail && (
                        item.reviewDetail.rating > 2 ? (
                          <FontAwesome name="star" size={24} color="black" />
                        ) : (
                          <FontAwesome name="star-o" size={24} color="black" />
                        )
                      )}
                      {!item.reviewDetail && (
                        <FontAwesome name="star-o" size={24} color="black" />
                      )}
                    </Pressable>
                  </View>
                  <View style={{marginLeft: 2}}>
                    <Pressable onPress={() => submitReview(item.userId, item.itemId, 'None', 4, item.reviewDetail)}>
                      {item.reviewDetail && (
                        item.reviewDetail.rating > 3 ? (
                          <FontAwesome name="star" size={24} color="black" />
                        ) : (
                          <FontAwesome name="star-o" size={24} color="black" />
                        )
                      )}
                      {!item.reviewDetail && (
                        <FontAwesome name="star-o" size={24} color="black" />
                      )}
                    </Pressable>
                  </View>
                  <View style={{marginLeft: 2}}>
                    <Pressable onPress={() => submitReview(item.userId, item.itemId, 'None', 5, item.reviewDetail)}>
                      {item.reviewDetail && (
                        item.reviewDetail.rating > 4 ? (
                          <FontAwesome name="star" size={24} color="black" />
                        ) : (
                          <FontAwesome name="star-o" size={24} color="black" />
                        )
                      )}
                      {!item.reviewDetail && (
                        <FontAwesome name="star-o" size={24} color="black" />
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </>
        ))}
      </>
    )
  }
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: '#6796DC',
    width: '100%',
    flex: 1,
    color: 'white',
  }
})