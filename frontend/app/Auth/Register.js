import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/global';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link, useRouter } from 'expo-router';
import { API_URL } from '@env'; // Import the environment variable

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });  // Clear error message when user starts typing
  };

  const handleSubmit = async () => {
    let valid = true;
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
      valid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone Number is required";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        Alert.alert(
          "Success",
          "User registered successfully",
          [
            {text:"Ok", onPress: () => router.push('/Auth/Login')}
          ]
        );
      } else {
        console.log('Failed to register user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={globalStyles.font4}>Create your Account</Text>
          <Text style={globalStyles.font5}>Please fill in your details to create your account.</Text>
        </View>
        <View style={styles.section}>
          <Form formData={formData} handleChange={handleChange} errors={errors} />
        </View>
        <View style={styles.section}>
          <Pressable onPress={handleSubmit}>
            <Button>CREATE AN ACCOUNT</Button>
          </Pressable>
        </View>
        <View style={styles.section}>
          <Link href={'/Auth/Login'}>
            <Text style={styles.font}>Already have an account? Sign in</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

function Form({ formData, handleChange, errors }) {
  return (
    <>
      <View style={styles.section}>
        <Text style={globalStyles.font6}>Name</Text>
        <Input
          placeholder="Enter Name..."
          name="name"
          value={formData.name}
          onChangeText={(value) => handleChange('name', value)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        
        <Text style={globalStyles.font6}>Email</Text>
        <Input
          placeholder="Enter Email..."
          name="email"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        
        <Text style={globalStyles.font6}>Address</Text>
        <Input
          placeholder="Enter Address..."
          name="address"
          value={formData.address}
          onChangeText={(value) => handleChange('address', value)}
        />
        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

        <Text style={globalStyles.font6}>Phone</Text>
        <Input
          placeholder="Enter Phone Number..."
          name="phone"
          value={formData.phone}
          onChangeText={(value) => handleChange('phone', value)}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        
        <Text style={globalStyles.font6}>Password</Text>
        <Input
          placeholder="Enter Password..."
          name="password"
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
          secureTextEntry={true}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        
        <Text style={globalStyles.font6}>Confirm Password</Text>
        <Input
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={formData.confirmPassword}
          onChangeText={(value) => handleChange('confirmPassword', value)}
          secureTextEntry={true}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      </View>
    </>
  );
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
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5
  }
});
