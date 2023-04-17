import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  useColorScheme
} from "react-native";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, userSelector, clearState, UserState } from "../redux/reducers/user.reducer";
import { store } from "../redux/store";
import { Section } from "../components";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";

export const Login = () : JSX.Element => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector);

  const onSubmit = () => {
    store.dispatch(loginUser({email, password} as UserState));
  };

  useEffect(() => {
    if (isError) {
      Toast.show(errorMessage as string, {
        duration: Toast.durations.LONG,
        backgroundColor: 'red'
      });
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      navigation.navigate('Dashboard' as never)
    }
  }, [isError, isSuccess]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Section title="Sign in to your account" />
        <View style={styles.container}>
          <Text style={[{ color: Colors.black }]}>Username</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)} />
          </View>
          <Text style={[{ color: Colors.black }]}>Password</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)} />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={onSubmit}>
            <Text style={[{ color: Colors.white }]}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp' as never)}>
            <Text style={styles.signup_button}>Or Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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