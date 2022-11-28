import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import des composant exterieurs
import Footer from '../conposants/Footer';
//import des variables de style prédéfinis
import {FONTS} from '../constantes/Fonts';
import {CENTER, TEXT, TITLE} from '../constantes/Constantes';
import {COLORS} from '../constantes/Couleurs';
import {STYLESHEADER} from '../constantes/StylesHeader';
import {STYLESMENU} from '../constantes/StyleMenu';
//import de la Fakedata
import {FakeArtiste} from '../data/FakeArtiste';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Programme = props => {
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

  // Variable pour la card
  const getArtiste = (
    nameArtiste,
    srcArtiste,
    descriptionArtiste,
    longueDescriptionArtiste,
  ) => {
    props.navigation.navigate('ArtisteDetaills', {
      nameArtiste: nameArtiste,
      srcArtiste: srcArtiste,
      descriptionArtiste: descriptionArtiste,
      longueDescriptionArtiste: longueDescriptionArtiste,
    });
  };
  const Card = ({
    nameArtiste,
    srcArtiste,
    onClickArtiste,
    descriptionArtiste,
    longueDescriptionArtiste,
  }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          onClickArtiste(
            nameArtiste,
            srcArtiste,
            descriptionArtiste,
            longueDescriptionArtiste,
          )
        }>
        <Image source={srcArtiste} style={styles.img} />
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{nameArtiste}</Text>
        </View>
        <Text style={styles.containerText}>{descriptionArtiste}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header />
      <ScrollView>
        <LinearGradient
          colors={['#f1793c', '#6c24dd', '#5dd29b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0.91}}>
          <Animated.View
            style={{opacity: filtre, transform: [{scale: scralView}]}}>
            <View style={styles.containerTextProgramme}>
              <View>
                <View style={CENTER}>
                  <Text style={TITLE}>Programme</Text>
                </View>
                <Text style={TEXT}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Distinctio tempora aspernatur reprehenderit, voluptates fuga
                  laudantium eius quisquam nemo doloremque soluta.
                </Text>
              </View>
              <View style={styles.cards}>
                <Text style={styles.dates}>Lundi 5 Décembre</Text>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={FakeArtiste}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => {
                    return (
                      <Card
                        nameArtiste={item.title}
                        srcArtiste={item.src}
                        descriptionArtiste={item.description}
                        longueDescriptionArtiste={item.longueDescription}
                        onClickArtiste={getArtiste}
                      />
                    );
                  }}
                />
              </View>
              <View style={styles.cards}>
                <Text style={styles.dates}>Mardi 6 Décembre</Text>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={FakeArtiste}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => {
                    return (
                      <Card
                        nameArtiste={item.title}
                        srcArtiste={item.src}
                        descriptionArtiste={item.description}
                        longueDescriptionArtiste={item.longueDescription}
                        onClickArtiste={getArtiste}
                      />
                    );
                  }}
                />
              </View>
              <View style={styles.cards}>
                <Text style={styles.dates}>Mercredi 7 Décembre</Text>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={FakeArtiste}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => {
                    return (
                      <Card
                        nameArtiste={item.title}
                        srcArtiste={item.src}
                        descriptionArtiste={item.description}
                        longueDescriptionArtiste={item.longueDescription}
                        onClickArtiste={getArtiste}
                      />
                    );
                  }}
                />
              </View>
            </View>
          </Animated.View>
        </LinearGradient>
        <Footer />
      </ScrollView>
      <Menu />
    </>
  );
};

//Variable pour les styles du contenu de la View
const styles = StyleSheet.create({
  // styles pour les cards
  cards: {
    marginVertical: 15,
  },
  card: {
    width: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: COLORS.mauveFonce,
  },
  img: {
    width: 150,
    borderRadius: 10,
    height: 120,
  },
  containerTitle: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontFamily: FONTS.titre,
    fontSize: 14,
  },
  containerText: {
    color: 'white',
    marginHorizontal: 5,
    marginBottom: 10,
    textAlign: 'center',
  },

  containerTextProgramme: {
    marginTop: 90,
    marginBottom: 15,
  },
  dates: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
});

export default Programme;
