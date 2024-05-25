import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/global'
import { FontAwesome6 } from '@expo/vector-icons';
import Card from '../../components/Card';
import Button2 from '../../components/Button2';
import HomeImg from '../../assets/images/home.jpg';
import HomeItem from '../../assets/images/item.jpg';
import Data from './data.json';
import BottomBar from '../../components/BottomBar';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
        <View style={styles.section1}>
            <View style={styles.child1}>
                <View>
                    <Text style={globalStyles.font7}>Welcome Back!</Text>
                    <Text style={globalStyles.font8}>User</Text>
                </View>
                {/* <View style={styles.icon}>
                    <FontAwesome6 name="magnifying-glass" size={24} color="black"/>
                </View> */}
                <View>
                </View>
            </View>
            <View style={styles.child2}>
                <Card>
                    <View style={styles.card}>
                        <View style={styles.child3}>
                            <Text style={styles.font}>Deliver at your doorsteps</Text>
                            <Button2>50% Off</Button2>
                        </View>
                        <View>
                            <Image source={HomeImg} style={{ width: 120, height: 120 }} />
                        </View>
                    </View>
                </Card>
            </View>
            <View style={styles.child2}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={globalStyles.font8}>Water Bottles</Text>
                    <Text style={globalStyles.font7}>View All</Text>
                </View>
            </View>
        </View>
        <View style={{height: '45%'}}>
            <List />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <BottomBar/>
        </View>
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
                        <Link href={'/Auth/Login'}>
                            <View style={{width: 90}}>
                                <Button2>Add to cart</Button2>
                            </View>
                        </Link>
                    </View>
                </View>
            )}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section1: {
        backgroundColor: '#6796DC',
        padding: 20,
        height: 350,
    },
    child1: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    icon: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 100
    },
    child2: {
        marginTop: 20,
        height: 150
    },
    child3: {
        flex: 1,
        flexDirection: 'col',
        justifyContent: 'space-between',
        height: '100%',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
    },
    font: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 24,
        color: '#625D5D',
    }
})