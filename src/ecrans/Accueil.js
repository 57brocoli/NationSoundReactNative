import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Animated,
  Pressable,
  ImageBackground,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
//import des variables de style prédéfinis
import {FONTS} from '../constantes/Fonts';
import {CENTER, TEXT, TITLE} from '../constantes/Constantes';
import {COLORS} from '../constantes/Couleurs';
import {STYLESHEADER} from '../constantes/StylesHeader';
import {STYLESMENU} from '../constantes/StyleMenu';
import {FakeData} from '../data/FakeHotelRestau';
import Footer from '../conposants/Footer';
import Card from '../conposants/Card';
import LinearGradient from 'react-native-linear-gradient';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import de Firebase
import auth from '@react-native-firebase/auth';

const Accueil = props => {
  //Variable pour afficher/masquer le menu
  const [showMenu, setShowMenu] = useState(false);
  //Varible d'animation lors de l'affichage/masquage de menu
  const slideMenu = useRef(new Animated.Value(260)).current;
  const scalView = useRef(new Animated.Value(1)).current;
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
              Animated.timing(scalView, {
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
            <Text style={STYLESMENU.nameUser}>
              {auth().currentUser.displayName}
            </Text>
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
    <>
      <Header />
      <ScrollView>
        <Animated.View
          style={{opacity: filtre, transform: [{scale: scalView}]}}>
          <ImageBackground
            source={require('../asset/img/paris6.jpg')}
            style={styles.background}>
            <Text style={styles.logo}>Nation Sound</Text>
          </ImageBackground>
        </Animated.View>
        <LinearGradient
          colors={['#f1793c', '#6c24dd', '#5dd29b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.LinearGradient}>
          <Animated.View
            style={{opacity: filtre, transform: [{scale: scalView}]}}>
            {/* Section programme */}
            <View style={styles.section}>
              <View style={CENTER}>
                <Text style={styles.title}>Le programme</Text>
              </View>
              <View>
                <Text style={TEXT}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                  eveniet quas, quo obcaecati a quaerat quasi ducimus cum
                  adipisci inventore amet molestiae, quibusdam repellat
                  doloribus iure libero numquam, consectetur quidem dolore
                  aliquam odio! Rerum ab perferendis voluptatibus voluptatem
                  ullam molestias doloribus ut alias explicabo? Beatae quas
                  dignissimos sequi. Sint, corporis.
                </Text>
                <View style={styles.containerProgrammeImages}>
                  <Image
                    source={require('../asset/img/artiste1.jpg')}
                    style={styles.Programmeimages}
                  />
                  <Image
                    source={require('../asset/img/artiste2.jpg')}
                    style={styles.Programmeimages}
                  />
                  <Image
                    source={require('../asset/img/artiste3.jpg')}
                    style={styles.Programmeimages}
                  />
                </View>
                <View style={CENTER}>
                  <Pressable
                    style={styles.button}
                    onPress={() => props.navigation.navigate('Programme')}>
                    <Text style={styles.textButton}>Programme</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            {/* Fin section programme */}
            {/* Section Remerciments */}
            <View style={styles.section}>
              <View style={CENTER}>
                <Text style={styles.title}>Nos remerciments</Text>
              </View>
              <Text style={TEXT}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas beatae nisi veniam reiciendis autem ipsa accusantium
                eius sed tenetur commodi?
              </Text>
              <Image
                source={require('../asset/img/remerciment.jpg')}
                style={styles.Remercimentimages}
              />
              <View style={CENTER}>
                <Pressable
                  style={styles.button}
                  onPress={() => props.navigation.navigate('Sponsors')}>
                  <Text style={styles.textButton}>Sponsors</Text>
                </Pressable>
              </View>
            </View>
            {/* Fin section Remerciments */}
            {/* Section hotels/restaurants */}
            <View style={styles.section}>
              <View style={CENTER}>
                <Text style={styles.title}>Hotel et Restaurants</Text>
              </View>
              <Text style={TEXT}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas beatae nisi veniam reiciendis autem ipsa accusantium
                eius sed tenetur commodi?
              </Text>
            </View>
            <FlatList
              horizontal={true}
              data={FakeData}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return <Card item={item} />;
              }}
            />

            {/* Fin section hotels/restaurants */}
            {/* Section map */}
            <View style={styles.section}>
              <View style={CENTER}>
                <Text style={styles.title}>Explorez le site</Text>
              </View>
              <Text style={TEXT}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas beatae nisi veniam reiciendis autem ipsa accusantium
                eius sed tenetur commodi?
              </Text>
              <ImageBackground
                source={require('../asset/img/geolocalisation.png')}
                style={styles.geolocalisation}>
                <View style={styles.buttonMap}>
                  <Pressable
                    style={styles.button}
                    onPress={() => props.navigation.navigate('Map')}>
                    <Text style={styles.textButton}>Ouvrir</Text>
                  </Pressable>
                </View>
              </ImageBackground>
            </View>
            {/* Fin section map */}

            {/* Fin section */}
          </Animated.View>
        </LinearGradient>
        <Footer />
      </ScrollView>
      <Menu />
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    zIndex: 1,
    flex: 1,
    marginTop: 52,
    height: 700,
    width: '103%',
    right: 20,
  },
  LinearGradient: {marginTop: -20},
  logo: {
    fontFamily: 'RaphLanokFuture-PvDx',
    fontSize: 70,
    color: 'white',
    marginTop: 70,
    marginLeft: 25,
  },
  title: {
    fontFamily: FONTS.titre,
    fontSize: 24,
    color: 'white',
  },
  section: {
    paddingHorizontal: 15,
  },

  containerProgrammeImages: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  Programmeimages: {
    height: 170,
    width: 90,
    borderRadius: 10,
  },
  button: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#1c043c',
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  Remercimentimages: {
    marginTop: 10,
    width: 'auto',
    height: 200,
    borderRadius: 10,
  },
  geolocalisation: {
    height: 200,
    marginHorizontal: -15,
  },
  buttonMap: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 140,
  },
});

export default Accueil;
