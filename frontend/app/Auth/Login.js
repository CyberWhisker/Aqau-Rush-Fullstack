import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/global';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link, useRouter } from 'expo-router';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.1.7:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/Home/${data.userId}`);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <Text style={globalStyles.font4}>Welcome Back!</Text>
      </View>
      <View style={styles.section2}>
        <Text style={globalStyles.font5}>Please fill in your email and password to login to your account.</Text>
      </View>
      <View style={styles.section2}>
        <Form formData={formData} handleChange={handleChange} />
      </View>
      <View style={styles.section2}>
        <Pressable>
          {/* <Text style={styles.Font}>Forgot Password?</Text> */}
        </Pressable>
      </View>
      <View style={styles.section2}>
        <Pressable onPress={handleSubmit}>
          <Button>Login</Button>
        </Pressable>
      </View>
      <View style={styles.section2}>
        <Link href={'/Auth/Register'}>
          <Text style={styles.Font2}>Don’t have an account? Sign UP</Text>
        </Link>
      </View>
    </View>
  );
}

function Form({ formData, handleChange }) {
  return (
    <>
      <Text style={globalStyles.font6}>Email</Text>
      <Input
        placeholder="Enter Email..."
        name="email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <Text style={globalStyles.font6}>Password</Text>
      <Input
        placeholder="Enter Password..."
        name="password"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry={true}
      />
    </>
  );
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
});
