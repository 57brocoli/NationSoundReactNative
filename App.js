import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Programme from './src/ecrans/Programme';
import Sponsors from './src/ecrans/Sponsors';
import Accueil from './src/ecrans/Accueil';
import Notifications from './src/ecrans/Notification';
import Parametres from './src/ecrans/Parametres';
import Information from './src/ecrans/Information';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ArtisteDetaills from './src/ecrans/ArtisteDetaills';
import Billetterie from './src/ecrans/Billetterie';
import {Image} from 'react-native';
import Profil from './src/ecrans/Profil';
import {COLORS} from './src/constantes/Couleurs';

const App = () => {
  const MyTabs = createNativeStackNavigator();

  function MaTableNavigation() {
    return (
      <MyTabs.Navigator>
        <MyTabs.Screen
          name="Accueil"
          component={Accueil}
          options={{headerShown: false}}
        />
        <MyTabs.Screen
          name="Profil"
          component={Profil}
          options={{headerShown: false}}
        />
        <MyTabs.Screen
          name="Programme"
          component={Programme}
          options={{headerShown: false}}
        />
        <MyTabs.Screen
          name="Information"
          component={Information}
          options={{headerShown: false}}
        />
        <MyTabs.Screen
          name="Sponsors"
          component={Sponsors}
          options={{headerShown: false}}
        />
        <MyTabs.Screen
          name="ArtisteDetaills"
          component={ArtisteDetaills}
          options={{headerShown: false}}
        />
        <MyTabs.Screen
          name="Billetterie"
          component={Billetterie}
          options={{headerShown: false}}
        />
      </MyTabs.Navigator>
    );
  }

  const Tab = createMaterialBottomTabNavigator();
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName=" "
          activeColor="#f1e469"
          inactiveColor="white"
          barStyle={{backgroundColor: COLORS.mauveFonce}}>
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
            name=" "
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
            }}
          />
          <Tab.Screen
            name="Profil"
            component={Profil}
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
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
