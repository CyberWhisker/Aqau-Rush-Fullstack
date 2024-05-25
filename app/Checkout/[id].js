import { Alert, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import HomeItem from '../../assets/images/item.jpg';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';

const handleFetch = async (id, setCartData, setTotalPrice, setUserData) => {
    let total = 0;
    try {
        const response = await fetch(`http://192.168.1.7:4000/cart/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        data.map((item) => {
            total += item.itemDetail.price;
        });
        setTotalPrice(total);
        setCartData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    try {
        const response = await fetch(`http://192.168.1.7:4000/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setUserData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


const handleSubmit = async (cartData, time, date, setCartData, setTotalPrice, setUserData, router) => {
    const userId = cartData[0]?.userId; // Assuming all cart items belong to the same user
    try {
        // Submit each cart item as an order
        for (const item of cartData) {
            const response = await fetch(`http://192.168.1.7:4000/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "userId": item.userId,
                    "itemId": item.itemId,
                    "quantity": item.quantity,
                    "price": item.itemDetail.price * item.quantity,
                    "time": time,
                    "date": date,
                    "status": 0,
                })
            });
            await response.json();
            await handleDelete(item._id, item.userId);
        }
        // Refetch data after all orders are submitted and items are deleted
        await handleFetch(userId, setCartData, setTotalPrice, setUserData);
        // Navigate to OrderSuccess page
        router.push(`/OrderSuccess/${userId}`);
    } catch (error) {
        console.error('Error submitting order:', error);
        Alert.alert('Error', 'There was an issue placing your order');
    }
};

const handleDelete = async (cartId, userId) => {
    try {
        await fetch(`http://192.168.1.7:4000/cart/${cartId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Success: Item deleted from cart');
    } catch (error) {
        console.error('Error deleting item from cart:', error);
    }
};


const hadnleUpdate = async () => {

}

export default function Checkout() {
    const router = useRouter();
    const {id} = useLocalSearchParams();

    const [userData, setUserData] = useState();
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        handleFetch(id, setCartData, setTotalPrice, setUserData);
    }, []);

    const [toggleStandard, setToggleStandard] = useState(true);
    const [toggleSchedule, setToggleSchedule] = useState(false);
    const [selected, setSelected] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
  return (
    <View style={{flex: 1}}>
        <TopBar>
            <Link href={`/Cart/${id}`}>
                <AntDesign name="arrowleft" size={30} color="white" />
            </Link>
            <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 30, color: 'white'}}>Checkout</Text>
            <Text></Text>
        </TopBar>
        <View style={{height: 200, borderBottomWidth: 5, borderColor: '#DADADA'}}>
            {cartData.length > 0 ? (
                <List cartData={cartData}/>
            ): (
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 40, color: 'red',textAlign: 'center',alignItems:' center', marginTop: 40}}>Cart is empty</Text>
            )}
        </View>
        <ScrollView>
            <View style={{justifyContent: 'space-between', padding: 20, flexDirection: 'row', borderBottomWidth: 5, borderColor: '#DADADA'}}>
                <View>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#625D5D'}}>Sub Total</Text>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#625D5D'}}>Delivery Fee</Text>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#2F8308', marginTop: 20}}>Amount to Pay</Text>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '600', fontSize: 10, color: '#AAAAAA', marginTop: 20, marginTop: 0}}>will be debited from wallet on each delivery </Text>
                </View>
                <View>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#625D5D'}}>₱ {totalPrice}</Text>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#625D5D'}}>₱ 10.00</Text>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: '#2F8308', marginTop: 20}}>₱ {totalPrice + 10}</Text>
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
                    {userData && (
                        <>
                            <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15}}>{userData.name}</Text>
                            <Text style={{fontFamily: 'Poppins', fontWeight: '400', fontSize: 15}}>{userData.address}</Text>
                            <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, marginTop: 20}}>{!userData.phone ? 'No Phone Number' : userData.phone}</Text>
                        </>
                    )}
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
                        <Pressable style={{justifyContent: 'space-between', flexDirection: 'row'}} onPress={() => [setToggleStandard(false),setToggleSchedule(true)]}>
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
                        <Time setSelectedTime={setSelectedTime}/>
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
                    <Pressable onPress={() => handleSubmit(cartData, selectedTime, selected, setCartData, setTotalPrice, setUserData ,router)}>
                        <ButtonStyle>Place Order</ButtonStyle>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

function List({cartData}) {
    return (
        <>
            <FlatList data={cartData} renderItem={({item}) => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderBottomWidth: 4, padding: 10, borderColor: '#DADADA'}}>
                    <View style={{flex: 1, height: '100%'}}>
                        <View style={{ width: 70, shadowOpacity: 0.4, shadowOffset: {height: 0, width: 2}}}>
                            <View>
                                <Image source={HomeItem} style={{borderRadius: 10}} />
                                <View style={{borderRadius: 100, backgroundColor: '#6796DC', position: 'absulote', top: -20, left: 1, width: '90%'}}>
                                    <Text style={{textAlign: 'center', color: 'white', fontWeight: '600'}}>{item.itemDetail.size} L</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 2}}>
                        <View>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.itemDetail.name}</Text>
                            <Text style={{fontSize: 13, fontWeight: 'bold', color: '#AAAAAA'}}>{item.itemDetail.size} Liter</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>₱ {item.itemDetail.price * item.quantity}.00</Text>
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

function Time({setSelectedTime}) {
    const [time, setTime] = useState('');
    const [active, setActive] = useState(false);
    const times = ['08:00', '08:45', '08:50'];
    return(
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            {times.map((item, index) => (
                <Pressable onPress={()=>[setTime(index), setSelectedTime(item)]}>
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