import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/global'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function Register() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={globalStyles.font4}>Create your Account</Text>
        <Text style={globalStyles.font5}>Please fill in your details to create your account.</Text>
      </View>
      <View style={styles.section}>
        <Form/>
      </View>
      <View style={styles.section}>
        <Button>CREATE AN ACCOUNT</Button>
      </View>
      <View style={styles.section}>
        <Text style={styles.font}>Alreay have an account? Sign in</Text>
      </View>
    </View>
  )
}

function Form() {
  return(
    <>
      <Text style={globalStyles.font6}>Name</Text>
      <Input placeholder={'Enter Name...'} name={'name'}/>
      <Text style={globalStyles.font6}>Email</Text>
      <Input placeholder={'Enter Email...'} name={'email'}/>
      <Text style={globalStyles.font6}>Password</Text>
      <Input placeholder={'Enter Password...'} name={'password'}/>
      <Text style={globalStyles.font6}>Confirm Password</Text>
      <Input placeholder={'Confirm Password...'} name={'confirmPassword'}/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
      padding: 30,
  },
  section: {
    marginTop: 30
  },
  font: {
    textAlign: 'center',
    fontSize: 18,
    color: '#625D5D'
  }
})