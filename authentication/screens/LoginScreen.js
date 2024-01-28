import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Modal, Pressable, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button as PaperButton, TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../src/loginAuthStore';
import axios from "axios"

const LoginScreen = () => {
  const { isPasswordShown, isEmailModalVisible, isForgotPasswordModalVisible, forgotPasswordEmail, setField, togglePasswordVisibility, setIsEmailModalVisible, setIsForgotPasswordModalVisible, setForgotPasswordEmail } = useAuthStore();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    try {
      const response = await axios.post(
        'http://192.168.29.163:4000/login', // Replace with your server endpoint
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

     

      // If the login was successful, you might want to navigate to another screen or perform additional actions.
    } catch (error) {
      console.error('API error:', error.response.data);

      // Handle the error, display an error message, or perform other actions.
    }
  };
  

  const handleNavigation = () => {
    navigation.navigate('Mobile');
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordModalVisible(true);
  };

  const handleSendVerification = () => {
    console.log('Send verification email to:', forgotPasswordEmail);
    setIsForgotPasswordModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Login</Text>
            </View>

            {/* Email Login */}
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Email address</Text>
              <PaperTextInput
                placeholder="Enter your email address"
                placeholderTextColor={'black'}
                keyboardType="email-address"
                style={styles.inputField}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            {/* Password Login */}
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Password</Text>
              <PaperTextInput
                placeholder="Enter your password"
                placeholderTextColor={'black'}
                secureTextEntry={!isPasswordShown}
                style={styles.inputField}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <View style={styles.upperContainer}>
                {/* Login with Phone Number */}
                <TouchableOpacity
                  onPress={handleNavigation}
                  style={styles.phoneNumberContainer}
                >
                  <Text style={styles.phoneNumberLinkText}>Login with Phone Number</Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <PaperButton
              mode="contained"
              onPress={handleEmailLogin}
              style={styles.loginButton}
            >
              Login with Email
            </PaperButton>

            {/* OR Section */}
            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => console.log('Pressed')}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  height: 52,
                  borderWidth: 1,
                  borderColor: 'gray',
                  marginRight: 4,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={require('../assets/facebook.png')}
                  style={{
                    height: 36,
                    width: 36,
                    marginRight: 8,
                  }}
                  resizeMode="contain"
                />
                <Text>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={handleGoogleSignIn}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  height: 52,
                  borderWidth: 1,
                  borderColor: 'gray',
                  marginRight: 4,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={require('../assets/google.png')}
                  style={{
                    height: 36,
                    width: 36,
                    marginRight: 8,
                  }}
                  resizeMode="contain"
                />
                <Text>Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Forgot Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isForgotPasswordModalVisible}
        onRequestClose={() => setIsForgotPasswordModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Forgot Password</Text>
            <PaperTextInput
              placeholder="Enter your email address"
              placeholderTextColor={'black'}
              keyboardType="email-address"
              style={styles.inputField}
              value={forgotPasswordEmail}
              onChangeText={(text) => setForgotPasswordEmail(text)}
            />
            <PaperButton
              mode="contained"
              onPress={handleSendVerification}
              style={styles.sendVerificationButton}
            >
              Send Verification
            </PaperButton>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setIsForgotPasswordModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 22,
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 22,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  inputField: {
    width: '100%',
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 22,
  },
  phoneNumberContainer: {
    marginRight: 20,
  },
  phoneNumberLinkText: {
    color: 'blue',
    fontSize: 13,
  },
  forgotPasswordText: {
    color: 'blue',
    fontSize: 16,
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButton: {
    marginBottom: 24,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
  orText: {
    fontSize: 16,
    color: 'black',
  },
  signupButton: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  sendVerificationButton: {
    marginTop: 18,
    marginBottom: 4,
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default LoginScreen;