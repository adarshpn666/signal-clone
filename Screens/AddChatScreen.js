import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon,Button,Input  } from 'react-native-elements';
import { db } from '../firebase';


 const AddChatScreen  = ({navigation}) => {

    const [input, setInput] = useState("");

    useLayoutEffect(() =>{
        navigation.setOptions({
            title:"Add new Chat",
            headerBackTitle:"Chats",
            headerTitleAlign:"center",
        });
    },[]);


    const createChat = async() =>{
        await db
        .collection("chats")
        .add({
            chatName:input,
        })
        .then(() =>{
            navigation.goBack();
        })
        .catch((error) => alert(error));
    };

  return (
   <View style = {styles.container}>
    <Input
    placeholder = "Enter a chat name"
    value = {input}
    onChangeText = {(text) => setInput(text)}
    leftIcon ={
        <Icon name = "wechat" type ="antdesign" size = {24} color = "black"/>    
    }
    onSubmitEditing = {createChat}
    />
    <Button disabled = {!input} onPress = {createChat} title="Create"/>
   </View>
  );
 };


export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        padding:30,
        height:"100%",
    },
});