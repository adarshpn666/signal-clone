import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Input, Image} from 'react-native-elements';
import { auth } from '../firebase';

const  LoginScreen = ({navigation}) => {

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

  useState(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        navigation.replace("Home");
      }
    });

    return unsubscribe;

  },[]);

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error));
  };


  return (
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar style = 'light'/>
        <Image
        source={{
          uri : "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
        style={ {width:200, height:200}}
        />
        <View style={styles.inputContainer}>
          <Input 
          placeholder = "Email" 
          type = "email"  
          value = {email} 
          onChangeText = {(text) => setEmail(text)} 
          autoFocus/>
          <Input 
          placeholder = "Password" 
          type = "password" 
          value = {password}
          onChangeText = {(text) => setPassword(text)} 
          onSubmitEditing = {signIn}
          secureTextEntry/>
        </View>

        <Button title ='Login' containerStyle = {styles.button} onPress = {signIn}/>
        <Button onPress = {() => navigation.navigate('Register')} title = 'Register' type ='outline' containerStyle = {styles.button}/>
        <View style = {{height:50}}></View>

      </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop:10,
  },
});
