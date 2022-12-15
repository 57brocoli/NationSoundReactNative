import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import des composant exterieurs
import Footer from '../conposants/Footer';
//import des variables de style prédéfinis
import {CENTER, TITLE} from '../constantes/Constantes';
import {COLORS} from '../constantes/Couleurs';
import {STYLESHEADER} from '../constantes/StylesHeader';
import {STYLESMENU} from '../constantes/StyleMenu';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FakeBillets} from '../data/FakeBillet';
//import de la Fakedata
import auth from '@react-native-firebase/auth';

const Billetterie = props => {
  //Variable pour afficher/masquer le menu
  const [showMenu, setShowMenu] = useState(false);

  //Varible d'animation lors de l'affichage/masquage de menu
  const slideMenu = useRef(new Animated.Value(260)).current;
  const scralView = useRef(new Animated.Value(1)).current;
  const filtre = useRef(new Animated.Value(1)).current;

  //Variable pour recupérer l'API des billets
  const [billets, setBillets] = useState([]);
  useEffect(() => setBillets(FakeBillets), []);

  //Varible pour le compteur de billet simple
  const [countBillets, setCountBillets] = useState(0);
  const upCountBillets = () => {
    setCountBillets(countBillets + 1);
  };
  const lessCountBillets = () => {
    countBillets > 0 && setCountBillets(countBillets - 1);
  };
  //Variable du header
  const Header = () => {
    return (
      <View style={STYLESHEADER.header}>
        <View style={STYLESHEADER.nav}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Accueil')}>
            <Image
              source={require('../asset/img/logo.jpg')}
              style={STYLESHEADER.iconNav}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
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
              setShowMenu(!showMenu);
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
    return (
      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: COLORS.mauveClaire,
          position: 'absolute',
          height: 623,
          top: 70,
          right: 0,
          paddingHorizontal: 15,
          paddingVertical: 10,
          transform: [{translateX: slideMenu}],
        }}>
        <View style={STYLESMENU.containerMenu}>
          {/* container de la photo de Profile */}
          <TouchableOpacity style={STYLESMENU.containerUserIcon}>
            <Image
              source={require('../asset/icons/userIcon.png')}
              style={STYLESMENU.userIcon}
            />
            <Text style={STYLESMENU.lienVersProfil}>Voir Profile</Text>
          </TouchableOpacity>
          {/* fin container de la photo de Profile */}

          {/* container du nom de l'utilisateur */}
          <Text style={STYLESMENU.nameUser}>Kyle Perry</Text>
          {/* fin container du nom de l'utilisateur */}

          {/* container des liens de navigation*/}
          <View style={STYLESMENU.containerLink}>
            <TouchableOpacity
              style={STYLESMENU.lienNav}
              onPress={() => props.navigation.navigate('Accueil')}>
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
            <TouchableOpacity style={STYLESMENU.lienNav}>
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
          <TouchableOpacity style={STYLESMENU.containerLinkDeconnexion}>
            <MaterialCommunityIcons name="logout" color={'white'} size={30} />
            <Text style={STYLESMENU.textDeconnexion}>Déconnexion</Text>
          </TouchableOpacity>
          {/*container se deconnecter*/}
        </View>
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
          end={{x: 1, y: 0.91}}>
          <Animated.View
            style={{
              opacity: filtre,
              transform: [{scale: scralView}],
            }}>
            <View style={styles.containerView}>
              <View style={CENTER}>
                <Text style={TITLE}>Billeterie</Text>
              </View>
              {billets.map((billet, index) => {
                return (
                  <View key={index} style={styles.containerBillet}>
                    <Image source={billet.src} style={styles.billetImg} />
                    <View style={styles.containerBilletsinfos}>
                      <TouchableOpacity>
                        <Text style={styles.billetText}>{billet.name}</Text>
                        <Text style={styles.billetText}>{billet.prix}</Text>
                      </TouchableOpacity>
                      <View style={styles.containterCount}>
                        <TouchableOpacity
                          onPress={() => {
                            lessCountBillets();
                          }}>
                          <Text style={styles.billetCount}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.billetCount}>{countBillets}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            upCountBillets();
                          }}>
                          <Text style={styles.billetCount}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
              {countBillets > 0 ? (
                <View style={styles.panier}>
                  <Text style={styles.countPanier}>
                    {countBillets} billets{' '}
                    {countBillets > 1 ? 'selectionnées' : 'selectionné'}
                  </Text>
                  <View style={styles.containerTotal}>
                    <Text style={styles.totalPanier}>Total:</Text>
                    <Text style={styles.totalPanier}>XXX €</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.buttonPanier}
                    onPress={() => {
                      alert(
                        "Votre paiment a bien été effectué, vous recevré bientôt votre billet dans votre espace perso précédé d'une notification",
                      );
                    }}>
                    <Text style={styles.textButtonPanier}>
                      Passer à la caisse
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                ''
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
  containerView: {
    paddingTop: 90,
    paddingHorizontal: 15,
  },
  containerBillet: {
    marginVertical: 17,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  billetImg: {
    width: '100%',
    height: 120,
    opacity: 0.8,
    borderRadius: 10,
  },
  containerBilletsinfos: {
    position: 'absolute',
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 340,
  },
  billetText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  containterCount: {
    flexDirection: 'row',
    marginVertical: 30,
  },
  billetCount: {
    marginHorizontal: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  panier: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 20,
    padding: 15,
  },
  countPanier: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  totalPanier: {
    color: COLORS.orange,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPanier: {
    backgroundColor: COLORS.mauveClaire,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textButtonPanier: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Billetterie;
