import {
  View,
  Text,
  Image,
  ScrollView,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import Footer from '../conposants/Footer';
import {COLORS} from '../constantes/Couleurs';
import {STYLESHEADER} from '../constantes/StylesHeader';
import {STYLESMENU} from '../constantes/StyleMenu';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CENTER} from '../constantes/Constantes';
import {FONTS} from '../constantes/Fonts';

const MapDetails = props => {
  const {titre, image, description} = props.route.params;
  const {width} = useWindowDimensions();

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
      <TouchableOpacity
        style={styles.buttonGoBack}
        onPress={() => props.navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" color={'white'} size={30} />
        <Text style={styles.textButtonGoBack}>Retour</Text>
      </TouchableOpacity>
      <ScrollView>
        <LinearGradient
          colors={['#f1793c', '#6c24dd', '#5dd29b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0.91}}
          style={styles.container}>
          <Animated.View
            style={{
              opacity: filtre,
              transform: [{scale: scralView}],
            }}>
            <View>
              <Image source={{uri: image}} style={styles.img} />
            </View>
            <View style={CENTER}>
              <Text style={styles.notificationTitle}>{titre}</Text>
            </View>
            <RenderHtml
              contentWidth={width}
              source={{html: description.slice(37)}}
              tagsStyles={tagsStyles}
            />
          </Animated.View>
        </LinearGradient>
        <Footer />
      </ScrollView>
      <Menu />
    </>
  );
};
const styles = StyleSheet.create({
  buttonGoBack: {
    width: 95,
    height: 45,
    position: 'absolute',
    marginTop: 70,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.mauveClaire,
    borderBottomRightRadius: 5,
  },
  textButtonGoBack: {
    color: 'white',
    fontSize: 16,
  },
  container: {
    minHeight: 460,
  },
  img: {
    width: '105%',
    height: 250,
    right: 15,
    marginTop: 45,
  },
  notificationTitle: {
    marginTop: 15,
    fontSize: 26,
    fontFamily: FONTS.titre,
    color: COLORS.jaune,
  },
});
// style du RenderHtml
const tagsStyles = {
  body: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: 15,
  },
};
export default MapDetails;
