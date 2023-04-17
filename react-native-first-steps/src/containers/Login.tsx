import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const Login : React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={[{color: Colors.black}]}>Username</Text> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <Text style={[{color: Colors.black}]}>Password</Text> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 

      <TouchableOpacity style={styles.loginBtn}>
      <Text style={[{color: Colors.white}]}>Sign in</Text> 
      </TouchableOpacity> 
      <TouchableOpacity>
        <Text style={styles.signup_button}>Or Signup</Text> 
      </TouchableOpacity> 
    </View> 
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    borderRadius: 5,
    margin: 10
  },
  image: {
    marginBottom: 40,
    height: 50
  },
  inputView: {
    backgroundColor: "#E8F0FE",
    opacity: 0.5,
    borderRadius: 6,
    width: "80%",
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  signup_button: {
    height: 30,
    marginTop: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 6,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#4F46E5",
  },
});