import React, {useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Programme from './src/ecrans/Programme';
import Sponsors from './src/ecrans/Sponsors';
import Accueil from './src/ecrans/Accueil';
import Notifications from './src/ecrans/Notification';
import Information from './src/ecrans/Information';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ArtisteDetaills from './src/ecrans/ArtisteDetaills';
import Billetterie from './src/ecrans/Billetterie';
import {Image, Text, View} from 'react-native';
import Profil from './src/ecrans/Profil';
import {COLORS} from './src/constantes/Couleurs';
import Login from './src/ecrans/Login';
import SingUp from './src/ecrans/SignUp';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import NotificationDetails from './src/ecrans/NotificationDetails';
import Notification from './src/ecrans/Notification';
import Map from './src/ecrans/Map';
import TopBarNavigation from './src/ecrans/TopBarNavigation';
import {Button} from 'react-native-paper';
import {STYLESHEADER} from './src/constantes/StylesHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Tabs = createBottomTabNavigator();
const Header = () => {
  return (
    <View style={STYLESHEADER.header}>
      <View style={STYLESHEADER.nav}>
        <TouchableOpacity>
          <Image
            source={require('./src/asset/img/logo.jpg')}
            style={STYLESHEADER.iconNav}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name={'menu'} color={'white'} size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
//Variable pour le menu
// Definition de toutes les routes
function MaTableNavigation(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Accueil1"
        component={Accueil}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profil"
        component={Profil}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Programme"
        component={Programme}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Information"
        component={Information}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Sponsors"
        component={Sponsors}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ArtisteDetaills"
        component={ArtisteDetaills}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Billetterie"
        component={Billetterie}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationDetails"
        component={NotificationDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen
        name="TopBarNavigation"
        component={TopBarNavigation}
        options={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: COLORS.mauveClaire,
          },
          headerLeft: () => (
            <Image
              source={require('./src/asset/img/logo.jpg')}
              style={STYLESHEADER.iconNav}
            />
          ),
          headerTitleStyle: {
            color: COLORS.mauveClaire,
          },
          headerRight: () => (
            <TouchableOpacity>
              <MaterialCommunityIcons
                name={'menu'}
                color={'white'}
                size={50}
                onPress={() => {
                  props.navigation.navigate('Accueil');
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {/* <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="LogIn"
        component={Login}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
}

// Definition de la bottom tab
function TabNavigation() {
  return (
    <Tabs.Navigator
      initialRouteName="Accueil"
      screenOptions={{
        headerShown: 'false',
        tabBarStyle: {backgroundColor: COLORS.mauveFonce, height: 55},
        tabBarShowLabel: false,
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: COLORS.orange,
      }}>
      <Tab.Screen
        name="notification"
        component={Notifications}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="Accueil"
        component={MaTableNavigation}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('./src/asset/img/logo.jpg')}
              style={{
                height: 70,
                width: 70,
                borderRadius: 50,
                marginTop: -40,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profil"
        component={Profil}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={34} />
          ),
        }}
      />
      {/* <Tab.Navigator
        initialRouteName="Profil"
        activeColor="#f1e469"
        inactiveColor="white"
        barStyle={{
          backgroundColor: COLORS.mauveFonce,
        }}>
        <Tab.Screen
          name="notification"
          component={Notifications}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={MaTableNavigation}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={require('./src/asset/img/logo.jpg')}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                  marginTop: -6,
                }}
              />
            ),
            tabBarLabel: false,
          }}
        />
        <Tab.Screen
          name="Profil"
          component={Login}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="account-box"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator> */}
    </Tabs.Navigator>
  );
}

// Definition de la navigation (ou la tab apparait ou pas)
const MainStack = createStackNavigator();
function MainStackScreen() {
  return (
    <MainStack.Navigator initialRouteName={'Home'}>
      <MainStack.Screen
        name={'Home'}
        component={TabNavigation}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name={'LogIn'}
        component={Login}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name={'SignUp'}
        component={SingUp}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
}
const App = () => {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
};
// Variable pour chacher le tab en fonction de la route appeler
const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  if (routeName === 'LogIn') {
    return 'none';
  }
  return 'flex';
};
export default App;
