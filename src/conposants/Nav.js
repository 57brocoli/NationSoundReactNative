import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLORS} from '../constantes/Couleurs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Nav = props => {
  console.log(props);
  const [showMenu, setShowMenu] = useState(false);
  const slideMenu = useRef(new Animated.Value(0)).current;
  const scralView = useRef(new Animated.Value(0)).current;
  const filtre = useRef(new Animated.Value(0)).current;
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
            <TouchableOpacity style={styles.lienNav}>
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
});
export default Nav;
