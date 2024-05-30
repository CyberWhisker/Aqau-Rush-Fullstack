import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TopBar from '../../components/TopBar';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import HomeItem from '../../assets/images/item.jpg';
import Button2 from '../../components/Button2';
import { Link, useLocalSearchParams } from 'expo-router';
import { API_URL } from '@env'; // Import the environment variable

const handleUpdate = async (cartId, quantity, fetchCart) => {
    try {
        const response = await fetch(`${API_URL}/cart/${cartId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity: quantity
            })
        });
        const data = await response.json();
        console.log(data);
        fetchCart(); // Re-fetch the cart data after update
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const handleDelete = async (cartId, fetchCart) => {
    try {
        const response = await fetch(`${API_URL}/cart/${cartId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        fetchCart(); // Re-fetch the cart data after update
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



export default function Cart() {
    const { id } = useLocalSearchParams();
    const [totalPrice, setTotalPrice] = useState();
    const [cartData, setCartData] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchCart();
    }, [id]);

    const fetchCart = async () => {
        let total = 0
        try {
            const response = await fetch(`${API_URL}/cart/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            data.map((item) => {
                total +=  item.itemDetail.price * item.quantity
            })
            setTotalPrice(total)
            setCartData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleShow = () => {
        setShow(!show);
    }

    return (
        <View style={{ flex: 1 }}>
            <TopBar>
                <Link href={`/Home/${id}`}>
                    <AntDesign name="arrowleft" size={30} color="white" />
                </Link>
                <Text style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: 30, color: 'white' }}>Shopping cart</Text>
                <Pressable onPress={ toggleShow}>
                    <Text style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: 15, color: 'white' }}>Edit</Text>
                </Pressable>
            </TopBar>
            <View style={{ height: '65%' }}>
                {cartData.length > 0 ? (
                    <List cartData={cartData} fetchCart={fetchCart} toggleShow={show}/>
                ) : (
                    <Text style={{fontFamily: 'Poppins-Bold', fontSize: 40, color: 'red',textAlign: 'center',alignItems:' center', marginTop: 40}}>Cart is empty</Text>
                )}
            </View>
            <Checkout totalPrice={totalPrice} userId={id}/>
        </View>
    );
}

function List({ cartData, fetchCart, toggleShow}) {
    return (
        <>
            <FlatList
                data={cartData}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderBottomWidth: 4, padding: 10, borderColor: '#DADADA' }}>
                        <View style={{ flex: 1, height: '100%' }}>
                            <View style={{ width: 70, shadowOpacity: 0.4, shadowOffset: { height: 0, width: 2 } }}>
                                <View>
                                    <Image source={HomeItem} style={{ borderRadius: 10 }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'space-between', flexDirection: 'column' }}>
                            <View>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.itemDetail.name}</Text>
                                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#AAAAAA' }}>{item.itemDetail.size} Liter</Text>
                            </View>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>₱ {item.itemDetail.price * item.quantity}.00</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <View>
                                {toggleShow && (
                                    <Pressable onPress={ () => handleDelete(item._id, fetchCart)}>
                                        <Text style={{textAlign: 'right', color: 'red', fontFamily: 'Poppins-Bold'}}>Remove</Text>
                                    </Pressable>
                                )}
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Pressable onPress={() => handleUpdate(item._id, item.quantity + 1, fetchCart)}>
                                    <Ionicons name="add-circle-sharp" size={29} color="black" />
                                </Pressable>
                                <Text style={{ fontWeight: '600', fontFamily: 'Poppins', color: '#7D7D7D' }}>{item.quantity}</Text>
                                <Pressable onPress={() => handleUpdate(item._id, item.quantity - 1, fetchCart)}>
                                    <AntDesign name="minuscircle" size={24} color="black" />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item._id} // Ensure each item has a unique key
            />
        </>
    );
}

function Checkout({totalPrice, userId}) {
    const [toggleCheckBox, setToggleCheckBox] = useState(true);

    return (
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center', borderTopWidth: 4, borderColor: '#DADADA', flexDirection: 'row', paddingHorizontal: 20 }}>
            <Pressable onPress={() => setToggleCheckBox(!toggleCheckBox)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ borderWidth: 2, padding: 2, height: 30, width: 30, borderRadius: 15, borderColor: '#AAAAAA', justifyContent: 'center', alignItems: 'center' }}>
                    {toggleCheckBox && (
                        <View style={{ height: '100%', width: '100%', borderRadius: 15, backgroundColor: '#6796DC' }} />
                    )}
                </View>
                <Text style={{ marginLeft: 5, color: '#AAAAAA', fontFamily: 'Poppins', fontWeight: '600' }}>Select All</Text>
            </Pressable>
            <Text style={{ flex: 1, fontFamily: 'Poppins', fontWeight: '600', fontSize: 17, textAlign: 'center' }}>₱ {totalPrice}</Text>
            <View style={{ flex: 1 }}>
                <Link href={`/Checkout/${userId}`}>
                    <ButtonStyle>Checkout</ButtonStyle>
                </Link>
            </View>
        </View>
    );
}

function ButtonStyle(props) {
    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Text style={styles.label}>{props.children}</Text>
            </View>
        </View>
    );
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
});
