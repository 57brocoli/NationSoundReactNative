import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constantes/Couleurs';
import Footer from '../conposants/Footer';
import {FakeSponsor} from '../data/FakeSponsor';
import LinearGradient from 'react-native-linear-gradient';
import {CENTER, TITLE} from '../constantes/Constantes';
import {FONTS} from '../constantes/Fonts';

const Notifications = props => {
  const [showMenu, setShowMenu] = useState(false);
  const slideMenu = useRef(new Animated.Value(221)).current;
  const scralView = useRef(new Animated.Value(1)).current;
  const filtre = useRef(new Animated.Value(1)).current;
  const slideView = useRef(new Animated.Value(0)).current;
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.nav}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Accueil')}>
            <Image
              source={require('../asset/img/logo.jpg')}
              style={styles.iconNav}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Animated.timing(slideMenu, {
                toValue: showMenu ? 221 : 0,
                duration: 400,
                useNativeDriver: true,
              }).start();
              Animated.timing(scralView, {
                toValue: showMenu ? 1 : 0.9,
                duration: 400,
                useNativeDriver: true,
              }).start();
              Animated.timing(filtre, {
                toValue: showMenu ? 1 : 0.5,
                duration: 400,
                useNativeDriver: true,
              }).start();
              Animated.timing(slideView, {
                toValue: showMenu ? 0 : -221,
                duration: 400,
                useNativeDriver: true,
              }).start();
              setShowMenu(!showMenu);
            }}>
            <MaterialCommunityIcons
              name={showMenu ? 'close' : 'menu'}
              color={'black'}
              size={50}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Menu burgeur */}
      <Animated.View
        style={{
          flexGrow: 1,
          zIndex: 1,
          backgroundColor: COLORS.mauveClaire,
          position: 'absolute',
          height: 623,
          top: 70,
          right: 0,
          paddingHorizontal: 15,
          paddingVertical: 10,
          transform: [{translateX: slideMenu}],
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 15,
          }}>
          <View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Image
                source={require('../asset/icons/userIcon.png')}
                style={{width: 60, height: 60}}
              />
              <Text style={{color: 'white', marginLeft: 15}}>Voir Profile</Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                marginTop: 10,
              }}>
              Kyle Perry
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <TouchableOpacity
              style={styles.lienNav}
              onPress={() => props.navigation.navigate('Accueil')}>
              <MaterialCommunityIcons name="home" color={'black'} size={30} />
              <Text style={{marginLeft: 20}}>Accueil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lienNav}
              onPress={() => props.navigation.navigate('Billetterie')}>
              <MaterialCommunityIcons name="ticket" color={'black'} size={30} />
              <Text style={{marginLeft: 20}}>Billetterie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lienNav}
              onPress={() => props.navigation.navigate('Programme')}>
              <MaterialCommunityIcons
                name="clipboard-list"
                color={'black'}
                size={30}
              />
              <Text style={{marginLeft: 20}}>Programme</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lienNav}
              onPress={() => props.navigation.navigate('Information')}>
              <MaterialCommunityIcons
                name="information"
                color={'black'}
                size={30}
              />
              <Text style={{marginLeft: 20}}>Information</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lienNav}>
              <MaterialCommunityIcons name="map" color={'black'} size={30} />
              <Text style={{marginLeft: 20}}>Map</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                left: 30,
                marginTop: 65,
              }}>
              <MaterialCommunityIcons name="logout" color={'black'} size={30} />
              <Text style={{marginLeft: 10}}>Déconnexion</Text>
            </TouchableOpacity>
            {/* {TabButton(currentTab, setCurrentTab, 'Logout', 'logout')} */}
          </View>
        </View>
      </Animated.View>
      {/* Fin menu burgeur */}

      <ScrollView>
        <View>
          <LinearGradient
            colors={['#f1793c', '#6c24dd', '#5dd29b']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.containerSponsors}>
            <Animated.View
              style={{opacity: filtre, transform: [{scale: scralView}]}}>
              <Animated.View
                style={{
                  transform: [{translateX: slideView}],
                }}>
                <View style={styles.containerTitle}>
                  <View style={CENTER}>
                    <Text style={TITLE}>Tous nos partenaires</Text>
                  </View>
                </View>
                {FakeSponsor.map((sponsor, index) => {
                  return (
                    <View style={styles.cards} key={index}>
                      <Image source={sponsor.src} style={styles.img} />
                      <View>
                        <Text style={styles.cardTitle}>{sponsor.title}</Text>
                        <Text style={styles.cardText}>
                          {sponsor.description}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </Animated.View>
            </Animated.View>
          </LinearGradient>
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    zIndex: 1,
    position: 'absolute',
    width: '100%',
  },
  nav: {
    height: 70,
    backgroundColor: COLORS.mauveClaire,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconNav: {
    height: 50,
    width: 50,
    margin: 10,
    borderRadius: 7,
  },
  lienNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    height: 50,
    marginTop: 20,
  },
  //style sponsors
  containerSponsors: {
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
  containerTitle: {
    marginTop: 90,
    marginBottom: 15,
  },
  cards: {
    width: 381,
    height: 170,
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: 10,
  },
  img: {
    width: 170,
    height: 170,
    borderRadius: 10,
  },
  cardTitle: {
    color: 'white',
    width: 180,
    fontSize: 20,
    fontFamily: FONTS.titre,
    margin: 15,
  },
  cardText: {
    overflow: 'hidden',
    height: 80,
    width: 180,
    color: 'white',
    marginHorizontal: 15,
  },
});

export default Notifications;
