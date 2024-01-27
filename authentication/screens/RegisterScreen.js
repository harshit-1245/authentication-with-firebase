import React from 'react';
import axios from "axios"
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import Button from "../buttons/Buttons"
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../src/authStore';



const RegisterScreen = () => {
  const navigation = useNavigation();
  const {
    email,
    mobileNumber,
    password,
    confirmPassword,
    isChecked,
    isPasswordShown,
    isConfirmedPasswordShown,
    setField,
    togglePasswordVisibility,
    resetForm,
  } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    if (!isChecked) {
      console.log('Please agree to the terms and conditions.');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://192.168.29.163:4000/register',
        {
          email: data.email,
          phone: data.mobileNumber,
          password: data.password,
          // Add other data fields as needed
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('API response:', response.data);
  
      // Handle successful response, navigation, etc.
    } catch (error) {
      console.error('API error:', error);
  
      // Log the full error response from the server
      if (error.response) {
        console.error('Server Response Data:', error.response.data);
        console.error('Server Response Status:', error.response.status);
        console.error('Server Response Headers:', error.response.headers);
      }
  
      // Handle error, display error message, etc.
    }
  };
  
  const navigatingToLogin = () => {
    navigation.navigate('Login');
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      // Reset the form after successful submission
      resetForm();
    }
  }, [isSubmitSuccessful, resetForm]);



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, marginHorizontal: 22 }}>
            <View style={{ marginVertical: 22 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginVertical: 12,
                  color: 'black',
                }}
              >
                Create Account
              </Text>

              <Text style={{ fontSize: 16, color: 'black' }}>
                Connect with your friend today!
              </Text>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
                Email address
              </Text>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      width: '100%',
                      height: 48,
                      borderColor: 'black',
                      borderWidth: 1,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: 22,
                    }}
                  >
                    <TextInput
                      placeholder="Enter your email address"
                      placeholderTextColor={'black'}
                      keyboardType="email-address"
                      style={{
                        width: '100%',
                      }}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  </View>
                )}
                name="email"
                defaultValue=""
                rules={{ required: 'Email address is required' }}
              />
              {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
                Mobile Number
              </Text>

              <Controller
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <View
                    style={{
                      width: '100%',
                      height: 48,
                      borderColor: 'black',
                      borderWidth: 1,
                      borderRadius: 8,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingLeft: 22,
                    }}
                  >
                    <Text
                      style={{
                        width: '16%',
                        borderRightWidth: 1,
                        borderLeftColor: 'grey',
                        height: '100%',
                        justifyContent: 'center',
                        paddingTop: 15,
                        fontSize: 17,
                      }}
                    >
                      +91
                    </Text>

                    <TextInput
                      placeholder="Enter your phone number"
                      placeholderTextColor={'black'}
                      keyboardType="numeric"
                      style={{
                        width: '80%',
                      }}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  </View>
                )}
                name="mobileNumber"
                defaultValue=""
                rules={{ required: 'Mobile number is required' }}
              />
              {errors.mobileNumber && (
                <Text style={{ color: 'red' }}>{errors.mobileNumber.message}</Text>
              )}
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
                Password
              </Text>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      width: '100%',
                      height: 48,
                      borderColor: 'black',
                      borderWidth: 1,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: 22,
                    }}
                  >
                    <TextInput
                      placeholder="Enter your password"
                      placeholderTextColor={'black'}
                      secureTextEntry={!isPasswordShown}
                      style={{
                        width: '100%',
                      }}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />

                    <TouchableOpacity
                      onPress={() => togglePasswordVisibility('isPasswordShown')}
                      style={{
                        position: 'absolute',
                        right: 12,
                      }}
                    >
                      {isPasswordShown ? (
                        <Ionicons name="eye-off" size={24} color={'black'} />
                      ) : (
                        <Ionicons name="eye" size={24} color={'black'} />
                      )}
                    </TouchableOpacity>
                  </View>
                )}
                name="password"
                defaultValue=""
                rules={{ required: 'Password is required' }}
              />
              {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
                Confirm Password
              </Text>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      width: '100%',
                      height: 48,
                      borderColor: 'black',
                      borderWidth: 1,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: 22,
                    }}
                  >
                    <TextInput
                      placeholder="Re-enter your password"
                      placeholderTextColor={'black'}
                      secureTextEntry={!isConfirmedPasswordShown}
                      style={{
                        width: '100%',
                      }}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />

                    <TouchableOpacity
                      onPress={() => togglePasswordVisibility('isConfirmedPasswordShown')}
                      style={{
                        position: 'absolute',
                        right: 12,
                      }}
                    >
                      {isConfirmedPasswordShown ? (
                        <Ionicons name="eye-off" size={24} color={'black'} />
                      ) : (
                        <Ionicons name="eye" size={24} color={'black'} />
                      )}
                    </TouchableOpacity>
                  </View>
                )}
                name="confirmPassword"
                defaultValue=""
                rules={{
                  required: 'Confirm Password is required',
                  validate: (value) => value === getValues('password') || 'Passwords do not match',
                }}
              />
              {errors.confirmPassword && (
                <Text style={{ color: 'red' }}>{errors.confirmPassword.message}</Text>
              )}
            </View>

            <View style={{ flexDirection: 'row', marginVertical: 6 }}>
              <Checkbox
                style={{ marginRight: 8 }}
                value={isChecked}
                onValueChange={(value) => {
                  setField('isChecked', value);
                }}
                color={isChecked ? '#007260' : undefined}
              />
              <Text>I agree to the terms and conditions</Text>
            </View>

            {!isChecked && (
              <Text style={{ color: 'red', fontSize: 14, marginTop: 6 }}>Please agree to the terms and conditions.</Text>
            )}

            <Button
              title="Sign Up"
              filled
              onPress={handleSubmit(onSubmit)}
              disabled={!isChecked}
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: 'gray',
                  marginHorizontal: 10,
                }}
              />
              <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: 'gray',
                  marginHorizontal: 10,
                }}
              />
            </View>

           

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 22,
              }}
            >
              <Text style={{ fontSize: 16, color: 'black' }}>Already have an account</Text>
              <Pressable onPress={navigatingToLogin}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#007260',
                    fontWeight: 'bold',
                    marginLeft: 6,
                  }}
                >
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
