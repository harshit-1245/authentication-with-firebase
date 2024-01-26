import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../buttons/Buttons'; // Assuming you have a Button component
import { useNavigation } from "@react-navigation/native";

const MobileLoginScreen = () => {
  const navigation=useNavigation()
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    // Handle sending OTP logic here
    console.log('Sending OTP to:', phoneNumber);
    // Uncomment the following line when you want to handle the OTP modal visibility
    setIsOtpModalVisible(true);
  };

  const handleVerifyOtp = () => {
    // Handle OTP verification logic here
    console.log('Verifying OTP:', otp);
    // Close the modal after handling OTP verification logic
    setIsOtpModalVisible(false);
  };

  const handleNavigation=()=>{
    navigation.navigate("Login")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loginTitle}>Login</Text>

      <View style={{ marginBottom: 12 }}>
        <Text style={styles.labelText}>Phone Number</Text>
        <TextInput
          placeholder="Enter your phone number"
          placeholderTextColor={'black'}
          keyboardType="numeric"
          style={styles.inputField}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>
 <Pressable onPress={handleNavigation}>
      <Text style={styles.loginWithEmailText}>Login with email</Text>
      </Pressable>

      <Button
        title="Send OTP"
        filled
        onPress={handleSendOtp}
        style={styles.sendOtpButton}
      />

      {/* OTP Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOtpModalVisible}
        onRequestClose={() => setIsOtpModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter OTP</Text>
            <TextInput
              placeholder="Enter OTP"
              placeholderTextColor={'black'}
              keyboardType="numeric"
              style={styles.inputField}
              value={otp}
              onChangeText={(text) => setOtp(text)}
            />
            <Button
              title="Verify OTP"
              filled
              onPress={handleVerifyOtp}
              style={styles.verifyOtpButton}
            />
            <Pressable
              style={styles.cancelButton}
              onPress={() => setIsOtpModalVisible(false)}
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
    padding: 16,
    marginTop: 50,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
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
    marginBottom: 0,
  },
  loginWithEmailText: {
    fontSize: 16,
    color: 'blue',
    alignSelf: 'flex-end',
    marginBottom: 0,
  },
  sendOtpButton: {
    marginTop: 18,
    marginBottom: 4,
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
  verifyOtpButton: {
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

export default MobileLoginScreen;