import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native'
import { Input ,Text, Button} from 'react-native-elements';
import { auth } from '../firebase';



 const RegisterScreen  = ({navigation}) => {
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [imageUrl, setImageUrl] = useState("");

     useLayoutEffect(() => {
        navigation.setOptions({
            headerBackImage:null,
            headerBackTitle:'Login', 
            headerTitleAlign: 'center',
        });
    },[navigation]);

     const register = () => {
            auth.createUserWithEmailAndPassword(email,password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                });
            })
            .catch(error => alert(error.message));
     };

     
  return (
      <KeyboardAvoidingView behavior = "padding" style={styles.container}>
          <StatusBar style = 'light'/>
          <Text h3 style = {{marginBottom: 50}}>Create a signal account</Text>
          <View style={styles.inputContainer}>
            <Input type ="text" placeholder = "Full Name" 
            value={name}
            onChangeText = {(text) => setName(text)}
            autoFocus/>
            <Input
            placeholder = "Email"
            type="email"
            value={email}
            onChangeText = {(text) =>{setEmail(text)}}
            />
            <Input
            placeholder = "Password"
            type="password"
            value={password}
            onChangeText = {(text) =>{setPassword(text)}}
            secureTextEntry
            />
            <Input
            placeholder = "Image url (optional)"
            type="text"
            value={imageUrl}
            onChangeText = {(text) =>{setImageUrl(text)}}
            onSubmitEditing = {register}
            />
          </View>
          <Button
            containerStyle={styles.button}
            title = 'Register'
            onPress={register}
            raised
          />
          <View style = {{height:50}}></View>
      </KeyboardAvoidingView>
  )
 };


export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
        backgroundColor:'white',
    },
    button: {
        width: 200,
        marginTop:10,
    },
    inputContainer: {
        width: 300,
    },
});