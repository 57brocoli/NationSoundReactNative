import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  useWindowDimensions,
  ActivityIndicator,
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
//import d'axios pour recupérer les données
import axios from 'axios';
//import de Render pour afficher le contenu des articles
import RenderHtml from 'react-native-render-html';
//import de Firebase
import auth from '@react-native-firebase/auth';
//import de la fakedate
import {FakeSponsort} from '../data/FakeSponsort';

const Sponsors = props => {
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

  //Fonction pour recuperer les articles
  useEffect(() => {
    axios
      .get('https://nationsounds.fr/wp-json/wp/v2/posts?_embed&per_page=100')
      .then(res => setListeSponsors(res.data));
  }, []);

  //Variable de stockage des articles
  const [listeSponsors, setListeSponsors] = useState();
  const {width} = useWindowDimensions();
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
            {listeSponsors ? (
              listeSponsors
                .filter(partenaire => partenaire.categories[0] === 31)
                .map((partenaire, index) => {
                  return (
                    <View key={index} style={styles.container}>
                      <Image
                        style={styles.img}
                        source={{
                          uri: partenaire._embedded['wp:featuredmedia']['0']
                            .source_url,
                        }}
                      />
                      <View style={styles.containerText}>
                        <Text style={styles.title}>
                          {partenaire.title.rendered}
                        </Text>
                        <RenderHtml
                          contentWidth={width}
                          source={{html: partenaire.excerpt.rendered}}
                          tagsStyles={tagsStyles}
                        />
                      </View>
                    </View>
                  );
                })
            ) : (
              <View style={styles.activityIndicator}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            )}
          </Animated.View>
        </LinearGradient>
        <Footer />
      </ScrollView>
      <Menu />
    </>
  );
};
const styles = StyleSheet.create({
  activityIndicator: {
    height: 280,
    justifyContent: 'center',
  },
  containerSponsors: {
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
  containerTitle: {
    marginTop: 90,
    marginBottom: 15,
  },
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 30,
  },
  containerText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    color: 'white',
    fontFamily: FONTS.titre,
    fontSize: 26,
  },
  description: {
    color: 'white',
    fontSize: 16,
    overflow: 'hidden',
    height: 110,
    width: 200,
  },
});
// style du RenderHtml
const tagsStyles = {
  body: {
    color: 'white',
    fontSize: 18,
    overflow: 'hidden',
    height: 110,
    width: 200,
  },
};
export default Sponsors;
