import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, SignUp } from './src/containers';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { store } from './src/redux';

function App(): JSX.Element {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Login to React Native' }}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up to React Native' }}/>
            <Stack.Screen name="Dashboard" component={SignUp} options={{ title: 'Welcome!' }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    </Provider>
  );
}

export default App;
