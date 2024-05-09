/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import messaging from '@react-native-firebase/messaging';
//import des composant exterieurs
import Footer from '../Conposants/Footer';
//import des variables de style prédéfinis
import {CENTER, TITLE} from '../asset/constantes/Constantes';
import {COLORS} from '../asset/constantes/Couleurs';
//import de la bare de navigation
import NavBar from '../Conposants/NavBar';
import axios from 'axios';

const Notification = props => {
    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    useEffect(() => {
        if (requestUserPermission()) {
            messaging()
                .getToken()
                .then(token => {
                    console.log(token);
                });
        } else {
            // console.log('failed token status', authStatus);
        }
        messaging()
            .getInitialNotification()
            .then(async remoteMessage => {
                if (remoteMessage) {
                    console.log('Notification caused app to open from quit state:', remoteMessage.notification);
                }
            });
        //lorsque l'on click sur la notification en arriere plan
        messaging().onNotificationOpenedApp(async remoteMessage => {
            console.log('Notification caused app to open from background state:', remoteMessage.notification);
        });
        // notification lorsque l'appli est en arrier plan
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
            setNotificationsListe(remoteMessage.notification);
        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body.slice(0, 52));
            // modifyLevel(remoteMessage);
            setNotificationsListe(remoteMessage.notification);
            // console.log(remoteMessage.notification);
        });
        return unsubscribe;
    }, []);

    // Variable pour stocker la notifications
    const [notificationsListe, setNotificationsListe] = useState();

    // fonction pour récupérer les notifications
    const [notifications, setNotifications] = useState([]);
    const fetchNotifications = () => {
        axios
            .get('https://pixelevent.site/api/notifications')
            .then(res => {
                setNotifications(res.data['hydra:member'].filter(notification => notification.actived === true));
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

    //fonction pour rafrechir la view
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        axios.get('https://pixelevent.site/api/notifications').then(res => setNotifications(res.data['hydra:member']));
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View>
            <NavBar props={props} />
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <LinearGradient
                    colors={['#f1793c', '#6c24dd', '#5dd29b']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0.91}}
                    style={styles.containerNotification}>
                    {/* <Animated.View
                        style={{
                            opacity: filtre,
                            transform: [{scale: scralView}],
                        }}>
                        <View style={styles.container}>
                            <View style={CENTER}>
                                <Text style={TITLE}>Notification</Text>
                            </View>
                            {notificationsListe ? (
                                <TouchableOpacity
                                    style={styles.notification}
                                    onPress={() =>
                                        props.navigation.navigate('NotificationDetails', {
                                            notificationTitle: notificationsListe.title,
                                            notificationBody: notificationsListe.body,
                                            notificationImg: notificationsListe.android.imageUrl,
                                        })
                                    }>
                                    <Text style={styles.notificationTitle}>{notificationsListe.title}</Text>
                                    <Text style={styles.notificationBody}>{notificationsListe.body}</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.NoNotification}>
                                    <Text style={styles.NoNotificationText}>
                                        Vous n'avez aucune notification pour le moment
                                    </Text>
                                </View>
                            )}
                        </View>
                    </Animated.View> */}
                    <ScrollView style={styles.container}>
                        <View style={CENTER}>
                            <Text style={TITLE}>Notification</Text>
                        </View>
                        {notifications.length > 0 ? (
                            notifications.map(notif => {
                                return (
                                    <TouchableOpacity
                                        key={notif.id}
                                        style={styles.notification}
                                        onPress={() =>
                                            props.navigation.navigate('NotificationDetails', {
                                                notificationTitle: notif.title,
                                                notificationBody: notif.content,
                                                notificationId: notif.id,
                                            })
                                        }>
                                        <Text style={styles.notificationTitle}>{notif.title}</Text>
                                        <Text style={styles.notificationBody}>{notif.content}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        ) : (
                            <View style={styles.NoNotification}>
                                <Text style={styles.NoNotificationText}>
                                    Vous n'avez aucune notification pour le moment
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                </LinearGradient>
                <Footer />
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    containerNotification: {
        minHeight: 460,
    },
    container: {
        marginTop: 70,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    NoNotification: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 15,
        marginBottom: 30,
    },
    NoNotificationText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    notification: {
        backgroundColor: COLORS.mauveFonce,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 15,
        marginBottom: 30,
        height: 100,
    },
    notificationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.jaune,
    },
    notificationBody: {
        fontSize: 16,
        color: 'white',
        overflow: 'hidden',
        height: 40,
    },
});
export default Notification;
