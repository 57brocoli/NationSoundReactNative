import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Animated,
  ActivityIndicator,
  useWindowDimensions,
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
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import d'axios pour recupérer les données
import axios from 'axios';
//import de Render pour afficher le contenu des articles
import RenderHtml from 'react-native-render-html';
//import de Firebase
import auth from '@react-native-firebase/auth';

const Information = props => {
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
            <MaterialCommunityIcons name={'menu'} color={'white'} size={50} />
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

  //Fonction pour recuperer les articles
  useEffect(() => {
    axios
      .get('https://nationsounds.fr/wp-json/wp/v2/posts?_embed&per_page=100')
      .then(res => setListeArticles(res.data));
  }, []);

  //Variable de stockage des articles
  const [listeArticles, setListeArticles] = useState();
  const {width} = useWindowDimensions();

  //Fonctions pour filtrées les articles
  const [nombreArticle, setNombreArticle] = useState(3);
  const tousAfficher = () => {
    setNombreArticle(listeArticles.length);
  };
  const revenir = () => {
    setNombreArticle(3);
  };

  // Variable pour la F.A.Q
  const [question1, setQuestion1] = useState(false);
  const showReponse1 = () => {
    setQuestion1(!question1);
  };
  const [question2, setQuestion2] = useState(false);
  const showReponse2 = () => {
    setQuestion2(!question2);
  };
  const [question3, setQuestion3] = useState(false);
  const showReponse3 = () => {
    setQuestion3(!question3);
  };

  return (
    <>
      <Header />
      <ScrollView>
        <LinearGradient
          colors={['#f1793c', '#6c24dd', '#5dd29b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Animated.View
            style={{opacity: filtre, transform: [{scale: scralView}]}}>
            <View style={styles.containerInfos}>
              <View style={styles.containerTextInfos}>
                <View style={CENTER}>
                  <Text style={TITLE}>Information</Text>
                </View>
                <Text style={TEXT}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Distinctio tempora aspernatur reprehenderit, voluptates fuga
                  laudantium eius quisquam nemo doloremque soluta.
                </Text>
              </View>
            </View>
            <ImageBackground
              source={require('../asset/img/imgInfos.jpg')}
              style={styles.backgroundImg}
            />

            {/* Section actualitées */}
            <View style={styles.containerInfos}>
              <View>
                <View style={CENTER}>
                  <Text
                    style={TITLE}
                    onPress={() => console.log(listeArticles.length)}>
                    Actualitées
                  </Text>
                </View>
                {nombreArticle !== 3 ? (
                  <TouchableOpacity
                    onPress={() => revenir()}
                    style={styles.filtre}>
                    <Text style={styles.colorBlack}>Revenir</Text>
                    <MaterialCommunityIcons
                      name="chevron-up"
                      color={'black'}
                      size={25}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => tousAfficher()}
                    style={styles.filtre}>
                    <Text style={styles.colorBlack}>Tous achicher</Text>
                    <MaterialCommunityIcons
                      name="chevron-down"
                      color={'black'}
                      size={25}
                    />
                  </TouchableOpacity>
                )}
                {!listeArticles ? (
                  <View>
                    <ActivityIndicator size="large" color="#00ff00" />
                  </View>
                ) : (
                  listeArticles
                    .filter(article => article.categories[0] === 29) //29 est la catégorie pour les articles de l'actualité
                    .slice(0, nombreArticle)
                    .map((article, index) => {
                      return (
                        <TouchableOpacity
                          style={styles.card}
                          key={index}
                          onPress={() =>
                            props.navigation.navigate('Article', {
                              title: article.title.rendered,
                              text: article.content.rendered,
                              img: article._embedded['wp:featuredmedia']['0']
                                .source_url,
                            })
                          }>
                          {/* Image à gauche */}
                          {!listeArticles ? (
                            <ActivityIndicator size="large" color="#00ff00" />
                          ) : (
                            <Image
                              style={styles.cardImg}
                              source={{
                                uri: article._embedded['wp:featuredmedia']['0']
                                  .source_url,
                              }}
                            />
                          )}
                          {/* Text à droite */}
                          <View style={styles.cardContainerText}>
                            <Text style={styles.cardTitle}>
                              {article.title.rendered}
                            </Text>
                            <RenderHtml
                              contentWidth={width}
                              source={{html: article.excerpt.rendered}}
                              tagsStyles={tagsStyles}
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    })
                )}
              </View>
              <View>
                <View style={CENTER}>
                  <Text style={TITLE}>Foire aux questions</Text>
                </View>

                <View style={styles.marginVertical}>
                  <TouchableOpacity
                    onPress={() => showReponse1()}
                    style={styles.containerQuestion}>
                    <Text style={styles.question}>
                      Comment reserver un billet ?
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={question1 ? styles.reponseShow : styles.reponseHide}>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestias, saepe?
                    </Text>
                  </View>
                </View>
                <View style={styles.marginVertical}>
                  <TouchableOpacity
                    onPress={() => showReponse2()}
                    style={styles.containerQuestion}>
                    <Text style={styles.question}>
                      Comment crée un compte ?
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={question2 ? styles.reponseShow : styles.reponseHide}>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestias, saepe?
                    </Text>
                  </View>
                </View>
                <View style={styles.marginVertical}>
                  <TouchableOpacity
                    onPress={() => showReponse3()}
                    style={styles.containerQuestion}>
                    <Text style={styles.question}>Accesibilité</Text>
                  </TouchableOpacity>
                  <View
                    style={question3 ? styles.reponseShow : styles.reponseHide}>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestias, saepe?
                    </Text>
                  </View>
                </View>
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
const styles = StyleSheet.create({
  containerInfos: {
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
  colorBlack: {
    color: 'black',
  },
  containerTextInfos: {
    marginTop: 90,
  },
  backgroundImg: {
    width: '105%',
    height: 240,
    right: 15,
    marginBottom: 15,
  },
  filtre: {
    width: 130,
    height: 25,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  marginVertical: {
    marginVertical: 5,
  },
  // Style FAQ
  containerQuestion: {
    width: 382,
    height: 50,
    zIndex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margintop: 10,
  },
  question: {
    color: 'black',
    fontFamily: FONTS.titre,
  },
  reponseShow: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderRadius: 0,
    height: 50,
    color: 'black',
    paddingTop: 0,
    paddingHorizontal: 15,
  },
  reponseHide: {
    top: -50,
    display: 'none',
  },
  footer: {},
  //style header
  header: {marginTop: 90},
  headerImg: {
    width: '105%',
    height: 200,
  },
  headerContainerText: {
    padding: 10,
  },
  headerTitle: {
    color: COLORS.jaune,
    fontSize: 18,
    fontWeight: 'bold',
  },
  //style card
  card: {
    backgroundColor: COLORS.mauveFonce,
    marginVertical: 10,

    borderRadius: 10,
    flexDirection: 'row',
  },
  cardImg: {
    width: 120,
    height: 130,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardContainerText: {
    padding: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
// style du RenderHtml
const tagsStyles = {
  body: {
    color: 'white',
    overflow: 'hidden',
    textAlign: 'justify',
    height: 79,
    width: 230,
  },
};
export default Information;
