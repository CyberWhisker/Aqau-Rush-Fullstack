import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/global'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function Login() {
  return (
    <View style={styles.container}>
        <View style={styles.section1}>
            <Text style={globalStyles.font4}>Welcome Back!</Text>
        </View>
        <View style={styles.section2}>
            <Text style={globalStyles.font5}>Please fill in your email password to login to your account.</Text>
        </View>
        <View style={styles.section2}>
            <Form/>
        </View>
        <View style={styles.section2}>
            <Pressable>
                <Text style={styles.Font}>Forgot Password?</Text>
            </Pressable>
        </View>
        <View style={styles.section2}>
            <Button>Login</Button>
        </View>
        <View style={styles.section2}>
            <Pressable>
                <Text style={styles.Font2}>Don’t  have an account? Sign UP</Text>
            </Pressable>
        </View>
    </View>
  )
}

function Form() {
    return (
        <>
            <Text style={globalStyles.font6}>Email</Text>
            <Input placeholder={'Enter Email...'} name={'email'}/>
            <Text style={globalStyles.font6}>Password</Text>
            <Input placeholder={'Enter Password...'} name={'email'}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30
    },
    section1: {
        marginTop: 20
    },
    section2: {
        marginTop: 20
    },
    Font: {
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#625D5D'
    },
    Font2: {
        textAlign: 'center',
        fontSize: 18,
        color: '#625D5D'
    }
})