import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import messaging from '@react-native-firebase/messaging';
//import des composant exterieurs
import Footer from '../Conposants/Footer';
//import des variables de style prédéfinis
import {CENTER, TITLE} from '../asset/constantes/Constantes';
import {COLORS} from '../asset/constantes/Couleurs';
import {STYLESHEADER} from '../asset/constantes/StylesHeader';
import {STYLESMENU} from '../asset/constantes/StyleMenu';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import de Firebase
import auth from '@react-native-firebase/auth';

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
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
    //lorsque l'on click sur la notification en arriere plan
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });
    // notification lorsque l'appli est en arrier plan
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      setNotificationsListe(remoteMessage.notification);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body.slice(0, 52),
      );
      // modifyLevel(remoteMessage);
      setNotificationsListe(remoteMessage.notification);
      // console.log(remoteMessage.notification);
    });
    return unsubscribe;
  }, []);

  // Variable pour stocker la notifications
  const [notificationsListe, setNotificationsListe] = useState();

  //Variable pour afficher/masquer le menu
  const [showMenu, setShowMenu] = useState(false);
  //Varible d'animation lors de l'affichage/masquage de menu
  const slideMenu = useRef(new Animated.Value(260)).current;
  const scralView = useRef(new Animated.Value(1)).current;
  const filtre = useRef(new Animated.Value(1)).current;

  //Variable du header
  const Header = () => {
    return (
      <View style={STYLESHEADER.header}>
        <View style={STYLESHEADER.nav}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Accueil1')}>
            <Image
              source={require('../asset/img/logo.jpg')}
              style={STYLESHEADER.iconNav}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowMenu(!showMenu);
              Animated.timing(slideMenu, {
                toValue: showMenu ? 260 : 0,
                duration: 300,
                useNativeDriver: true,
              }).start();
              Animated.timing(scralView, {
                toValue: showMenu ? 1 : 0.95,
                duration: 300,
                useNativeDriver: true,
              }).start();
              Animated.timing(filtre, {
                toValue: showMenu ? 1 : 0.5,
                duration: 300,
                useNativeDriver: true,
              }).start();
            }}>
            <MaterialCommunityIcons
              name={showMenu ? 'close' : 'menu'}
              color={'white'}
              size={50}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  //Variable pour le menu
  const Menu = () => {
    // variable pour se deconnecter
    const onSingOut = () => {
      auth()
        .signOut()
        .then(() => {
          console.log('User signed out!');
          props.navigation.navigate('LogIn');
        });
    };

    return (
      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: COLORS.mauveClaire,
          position: 'absolute',
          height: 623,
          top: 70,
          right: 0,
          transform: [{translateX: slideMenu}],
        }}>
        <LinearGradient
          colors={[COLORS.mauveClaire, COLORS.mauveFonce]}
          style={{paddingHorizontal: 15, paddingVertical: 10}}>
          <View style={STYLESMENU.containerMenu}>
            {/* container de la photo de Profile */}
            <TouchableOpacity
              style={STYLESMENU.containerUserIcon}
              onPress={() => props.navigation.navigate('Profil')}>
              <Image
                source={require('../asset/icons/userIcon.png')}
                style={STYLESMENU.userIcon}
              />
              <Text style={STYLESMENU.lienVersProfil}>Voir Profile</Text>
            </TouchableOpacity>
            {/* fin container de la photo de Profile */}

            {/* container du nom de l'utilisateur */}
            {auth() ? (
              <Text style={STYLESMENU.nameUser}>
                {auth().currentUser.displayName}
              </Text>
            ) : (
              ''
            )}
            {/* fin container du nom de l'utilisateur */}

            {/* container des liens de navigation*/}
            <View style={STYLESMENU.containerLink}>
              <TouchableOpacity
                style={STYLESMENU.lienNav}
                onPress={() => props.navigation.navigate('Accueil1')}>
                <MaterialCommunityIcons
                  name="home"
                  color={COLORS.mauveClaire}
                  size={30}
                />
                <Text style={STYLESMENU.textLink}>Accueil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={STYLESMENU.lienNav}
                onPress={() => props.navigation.navigate('Billetterie')}>
                <MaterialCommunityIcons
                  name="ticket"
                  color={COLORS.mauveClaire}
                  size={30}
                />
                <Text style={STYLESMENU.textLink}>Billetterie</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={STYLESMENU.lienNav}
                onPress={() => props.navigation.navigate('Programme')}>
                <MaterialCommunityIcons
                  name="clipboard-list"
                  color={COLORS.mauveClaire}
                  size={30}
                />
                <Text style={STYLESMENU.textLink}>Programme</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={STYLESMENU.lienNav}
                onPress={() => props.navigation.navigate('Information')}>
                <MaterialCommunityIcons
                  name="information"
                  color={COLORS.mauveClaire}
                  size={30}
                />
                <Text style={STYLESMENU.textLink}>Information</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={STYLESMENU.lienNav}
                onPress={() => props.navigation.navigate('Map')}>
                <MaterialCommunityIcons
                  name="map"
                  color={COLORS.mauveClaire}
                  size={30}
                />
                <Text style={STYLESMENU.textLink}>Map</Text>
              </TouchableOpacity>
            </View>
            {/* fin container des liens de navigation*/}

            {/*container se deconnecter*/}
            <TouchableOpacity
              style={STYLESMENU.containerLinkDeconnexion}
              onPress={() => onSingOut()}>
              <MaterialCommunityIcons name="logout" color={'white'} size={30} />
              <Text style={STYLESMENU.textDeconnexion}>Déconnexion</Text>
            </TouchableOpacity>
            {/*container se deconnecter*/}
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <View>
      <Header />
      <ScrollView>
        <LinearGradient
          colors={['#f1793c', '#6c24dd', '#5dd29b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0.91}}
          style={styles.containerNotification}>
          <Animated.View
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
                  <Text style={styles.notificationTitle}>
                    {notificationsListe.title}
                  </Text>
                  <Text style={styles.notificationBody}>
                    {notificationsListe.body}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.NoNotification}>
                  <Text style={styles.NoNotificationText}>
                    Vous n'avez aucune notification pour le moment
                  </Text>
                </View>
              )}
            </View>
          </Animated.View>
        </LinearGradient>
        <Footer />
      </ScrollView>
      <Menu />
    </View>
  );
};
const styles = StyleSheet.create({
  containerNotification: {
    height: 460,
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
