/* eslint-disable react-hooks/rules-of-hooks */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
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
//import de la Fakedata
import {FakeArticle} from '../data/FakeArticle';

const Tab = createMaterialTopTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home2" style={{top: 70}}>
      <Tab.Screen name="Home2" component={Home2} />
      <Tab.Screen name="FAQ" component={FAQ} />
      <Tab.Screen name="Actualite" component={Actualite} />
    </Tab.Navigator>
  );
}
function Home2() {
  return (
    <View>
      <ScrollView>
        <LinearGradient
          colors={['#f1793c', '#6c24dd', '#5dd29b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Animated.View
          // style={{opacity: filtre, transform: [{scale: scralView}]}}
          >
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
          </Animated.View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
function FAQ() {
  return (
    <View>
      <ScrollView>
        <LinearGradient
          colors={['#f1793c', '#6c24dd', '#5dd29b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Animated.View
          // style={{opacity: filtre, transform: [{scale: scralView}]}}
          >
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
          </Animated.View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
function Actualite() {
  return (
    <View>
      <ScrollView>
        <LinearGradient
          colors={['#f1793c', '#6c24dd', '#5dd29b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Animated.View
          // style={{opacity: filtre, transform: [{scale: scralView}]}}
          >
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
            </View>
          </Animated.View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

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

export default function TopBarNavigation() {
  //Variable pour afficher/masquer le menu
  const [showMenu, setShowMenu] = useState(false);
  //Varible d'animation lors de l'affichage/masquage de menu
  const slideMenu = useRef(new Animated.Value(260)).current;
  const scralView = useRef(new Animated.Value(1)).current;
  const filtre = useRef(new Animated.Value(1)).current;

  return <MyTabs />;
}
const styles = StyleSheet.create({
  containerInfos: {
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
  containerTextInfos: {
    marginTop: 0,
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
