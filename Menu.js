import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import INICIO from './screens/Welcome';
import HOME from './screens/Home';
import SIGNUP from './screens/SignUp';
import VIEWER from './screens/Viewer';
import UPLOAD from './screens/Upload';
import USER from './screens/User';
import CHANGEPASSWORD from './screens/ChangePassword';
import TITLEMANAGER from './screens/TitleManager';
import TITLEEDIT from './screens/TitleEdit';
import DELETEACCOUNT from './screens/DeleteAccount';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Welcome" component = {INICIO} />
        <Stack.Screen name = "Manga Library" component = {HOME} />
        <Stack.Screen name = "SignUp" component = {SIGNUP} />
        <Stack.Screen name = "Viewer" component = {VIEWER} />
        <Stack.Screen name = "Upload" component = {UPLOAD} />
        <Stack.Screen name = "User" component = {USER} />
        <Stack.Screen name = "ChangePassword" component = {CHANGEPASSWORD} />
        <Stack.Screen name = "TitleManager" component={TITLEMANAGER} />
        <Stack.Screen name = "TitleEdit" component={TITLEEDIT} />
        <Stack.Screen name = "DeleteAccount" component={DELETEACCOUNT} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;