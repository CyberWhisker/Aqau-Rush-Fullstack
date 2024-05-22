import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopBar from '../../components/TopBar'
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';

const statuses = [
    { label: 'Order Made', icon: 'receipt', description: 'Lorem' },
    { label: 'Package Labelled', icon: 'local-offer', description: 'Lorem' },
    { label: 'Delivering', icon: 'local-shipping', description: 'Lorem' },
    { label: 'My Location', icon: 'location-on', description: 'Lorem' },
  ];

export default function Track() {
  return (
    <View style={{flex: 1}}>
        <TopBar>
            <AntDesign name="arrowleft" size={30} color="white" />
            <Text style={{fontFamily: 'Poppins', fontWeight: '700', fontSize: 30, color: 'white'}}>Track Order</Text>
            <Text></Text>
        </TopBar>
        <View style={{padding: 20, borderBottomWidth: 4, borderColor: '#DADADA'}}>
            <View style={{flexDirection: 'row', justifyContent:'center'}}>
                <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontSize: '16px', fontWeight: '400', color: '#85B6FF'}}>Order Id: 0123457</Text>
                <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontSize: '16px', fontWeight: '400', marginLeft: 10}}>will be delivered by:</Text>

            </View>
            <View style={{marginTop: 20}}>
                <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontSize: '24px', fontWeight: '600'}}>Wednesday, Dec. 3 </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <AntDesign name="clockcircleo" size={24} color="black" />
                <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontSize: '14px', fontWeight: '400', color: '#000000'}}>08:45AM - 12:00PM</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <Entypo name="location-pin" size={24} color="black" />
                <Text style={{textAlign: 'center', fontFamily: 'Poppins', fontSize: '16px', fontWeight: '400', color: '#707070'}}>Room 6, Sesame Lodging House</Text>
            </View>
        </View>
        <View>
            <OrderStatus/>
        </View>
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
        paddingHorizontal: 10,
    },
        statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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