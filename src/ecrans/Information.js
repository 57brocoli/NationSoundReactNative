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
import {FakeArticle} from '../data/FakeArticle';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

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
            <MaterialCommunityIcons name={'menu'} color={'white'} size={50} />
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

  //Variable pour recupérer les articles
  const [articles, setArticles] = useState([]);
  useEffect(() => setArticles(FakeArticle), []);
  //Variable card qui représente un article
  const Card = ({article, id}) => {
    return (
      <TouchableOpacity style={styles.article} Key={id}>
        <Image source={article.src} style={styles.articleimg} />
        <View style={styles.containerText}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <View style={styles.containerArticleText}>
            <Text style={styles.articleText}>{article.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  //Variable pour filtré les articles
  const [nombreArticle, setNombreArticle] = useState(3);
  const tousAfficher = () => {
    setNombreArticle(FakeArticle.length);
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

  const Tab = createMaterialTopTabNavigator();
  function MyTabs() {
    return (
      <Tab.Navigator initialRouteName="Home2" style={{top: 0}}>
        <Tab.Screen name="Home2" component={Home2} />
        <Tab.Screen name="FAQ" component={FAQ} />
        <Tab.Screen name="Actualite" component={Actualite} />
      </Tab.Navigator>
    );
  }
  function Home2() {
    return (
      <View>
        <Text>Hello1</Text>
      </View>
    );
  }
  function FAQ() {
    return (
      <View>
        <Text>Hello2</Text>
      </View>
    );
  }
  function Actualite() {
    return (
      <View>
        <Text>Hello3</Text>
      </View>
    );
  }
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
            <View style={styles.containerInfos}>
              <View>
                <View style={CENTER}>
                  <Text style={TITLE}>Actualitées</Text>
                </View>
                {nombreArticle !== 3 ? (
                  <TouchableOpacity
                    onPress={() => revenir()}
                    style={styles.filtre}>
                    <Text style={{color: 'black'}}>Revenir</Text>
                    <Image
                      source={require('../asset/icons/flecheHaut.png')}
                      style={{height: 15, width: 15}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => tousAfficher()}
                    style={styles.filtre}>
                    <Text style={{color: 'black'}}>Tous achicher</Text>
                    <Image
                      source={require('../asset/icons/flecheBas.png')}
                      style={{height: 15, width: 15}}
                    />
                  </TouchableOpacity>
                )}
                {articles.slice(0, nombreArticle).map((article, id) => {
                  return <Card article={article} key={id} />;
                })}
              </View>
              <View>
                <View style={CENTER}>
                  <Text style={TITLE}>Foire aux questions</Text>
                </View>

                <View style={{marginVertical: 5}}>
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
                <View style={{marginVertical: 5}}>
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
                <View style={{marginVertical: 5}}>
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
  containerTextInfos: {
    marginTop: 90,
  },
  backgroundImg: {
    width: '105%',
    height: 200,
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
  article: {
    height: 120,
    width: 381,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.mauveFonce,
    flexDirection: 'row',
  },
  articleimg: {
    width: 150,
    height: 120,
    borderRadius: 10,
  },
  containerText: {
    width: 250,
    padding: 15,
  },
  articleTitle: {
    color: 'white',
    width: 180,
    margin: 2,
    fontSize: 16,
    fontFamily: FONTS.titre,
  },
  containerArticleText: {
    overflow: 'hidden',
    height: 65,
    width: 180,
  },
  articleText: {
    color: 'white',
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
});
export default Information;
