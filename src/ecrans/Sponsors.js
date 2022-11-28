import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import des composant exterieurs
import Footer from '../conposants/Footer';
//import des variables de style prédéfinis
import {FONTS} from '../constantes/Fonts';
import {TITLE, CENTER} from '../constantes/Constantes';
import {COLORS} from '../constantes/Couleurs';
import {STYLESHEADER} from '../constantes/StylesHeader';
import {STYLESMENU} from '../constantes/StyleMenu';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import de la Fakedata
import {FakeSponsor} from '../data/FakeSponsor';

const Sponsors = props => {
  //Variable pour afficher/masquer le menu
  const [showMenu, setShowMenu] = useState(false);
  //Varible d'animation lors de l'affichage/masquage de menu
  const slideMenu = useRef(new Animated.Value(260)).current;
  const scralView = useRef(new Animated.Value(1)).current;
  const filtre = useRef(new Animated.Value(1)).current;

  //Varibale pour la navigation
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
    <>
      <Header />
      <ScrollView>
        <LinearGradient
          colors={['#f1793c', '#6c24dd', '#5dd29b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.containerSponsors}>
          <Animated.View
            style={{opacity: filtre, transform: [{scale: scralView}]}}>
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
                    <Text style={styles.cardText}>{sponsor.description}</Text>
                  </View>
                </View>
              );
            })}
          </Animated.View>
        </LinearGradient>
        <Footer />
      </ScrollView>
      <Menu />
    </>
  );
};
const styles = StyleSheet.create({
  //style pour le header
  header: {
    zIndex: 1,
    position: 'absolute',
    width: '100%',
  },
  nav: {
    height: 70,
    backgroundColor: 'rgba(255,255,255,0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconNav: {
    height: 50,
    width: 50,
    margin: 10,
  },
  menuactive: {
    width: '50%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    right: '-50%',
  },
  menudesactive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    right: '-100%',
    display: 'none',
  },
  containerLienMenu: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  lienMenu: {
    fontFamily: FONTS.titre,
    fontSize: 24,
    color: 'black',
    marginHorizontal: 15,
  },
  // Fin style pour le header
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
export default Sponsors;
