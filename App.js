import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Page1 from './src/ecrans/Page1';
import Page2 from './src/ecrans/Page2';
import Accueil from './src/ecrans/Accueil';
import Notifications from './src/ecrans/Notification';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import Profil from './src/ecrans/Profil';
import {COLORS} from './src/asset/constantes/Couleurs';
import Login from './src/ecrans/Login';
import SingUp from './src/ecrans/SignUp';
import Map from './src/ecrans/Map';
import Test from './src/ecrans/Test';
import axios from 'axios';
import NotificationDetails from './src/Conposants/Notification/NotificationDetails';
import Notification from './src/ecrans/Notification';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Tabs = createBottomTabNavigator();

// Definition de toutes les routes
function MaTableNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Accueil1"
                component={Accueil}
                options={{
                    headerShown: false,
                }}
            />
            {/* <Stack.Screen
                name="Profil"
                component={Profil}
                options={{headerShown: false}}
            /> */}
            <Stack.Screen name="Page1" component={Page1} options={{headerShown: false}} />
            <Stack.Screen name="Page2" component={Page2} options={{headerShown: false}} />
            <Stack.Screen name="Test" component={Test} options={{headerShown: false}} />
            <Stack.Screen name="Notification" component={Notification} options={{headerShown: false}} />
            <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={{headerShown: false}} />
            <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
    );
}

// Definition de la bottom tab
function TabNavigation() {
    const [notifications, setNotifications] = useState([]);
    const [activeNotificationsCount, setActiveNotificationsCount] = useState(0);

    const fetchNotifications = () => {
        axios
            .get('https://pixelevent.site/api/notifications')
            .then(res => {
                setNotifications(res.data['hydra:member']);
                const activeNotifications = res.data['hydra:member'].filter(
                    notification => notification.actived === true,
                );
                setActiveNotificationsCount(activeNotifications.length);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des notifications : ', error);
            });
    };
    useEffect(() => {
        // Exécuter la requête initiale
        fetchNotifications();
        // Mettre en place un intervalle pour exécuter la requête toutes les 30 secondes
        const intervalId = setInterval(() => {
            fetchNotifications();
        }, 30000);
        // Nettoyer l'intervalle lors du démontage du composant
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Tabs.Navigator
            initialRouteName="Accueil"
            screenOptions={{
                headerShown: 'false',
                tabBarStyle: {backgroundColor: COLORS.mauveFonce, height: 55, borderTopColor: COLORS.mauveFonce},
                tabBarShowLabel: false,
                tabBarInactiveTintColor: 'white',
                tabBarActiveTintColor: COLORS.orange,
            }}>
            <Tab.Screen
                name="notification"
                component={Notifications}
                options={{
                    tabBarBadge: activeNotificationsCount > 0 ? activeNotificationsCount : null,
                    headerShown: false,
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="bell" color={color} size={26} />,
                }}
            />
            <Tabs.Screen
                name="Accueil"
                component={MaTableNavigation}
                options={{
                    headerShown: false,
                    tabBarIcon: () => <Image source={require('./src/asset/img/logo.jpg')} style={styles.img} />,
                }}
            />
            <Tabs.Screen
                name="Profil"
                component={Profil}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="account" color={color} size={34} />,
                }}
            />
        </Tabs.Navigator>
    );
}

// Definition de la navigation (la ou la tab apparait ou pas)
const MainStack = createStackNavigator();
function MainStackScreen() {
    return (
        <MainStack.Navigator initialRouteName={'LogIn'}>
            <MainStack.Screen name={'Home'} component={TabNavigation} options={{headerShown: false}} />
            <MainStack.Screen name={'LogIn'} component={Login} options={{headerShown: false}} />
            <MainStack.Screen name={'SignUp'} component={SingUp} options={{headerShown: false}} />
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
const styles = StyleSheet.create({
    img: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginTop: 0,
    },
});

export default App;
