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
  Dimensions,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
//import des variables de style prédéfinis
import {FONTS} from '../asset/constantes/Fonts';
import {CENTER, TEXT} from '../asset/constantes/Constantes';
import {COLORS} from '../asset/constantes/Couleurs';
import Footer from '../Conposants/Footer';
import Card from '../Conposants/SousComposants/Card';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Loader from '../Conposants/SousComposants/Loader';
import NavBar from '../Conposants/NavBar';

const Accueil = props => {
  //Varible d'animation lors de l'affichage/masquage de menu
  const scalView = useRef(new Animated.Value(1)).current;
  const filtre = useRef(new Animated.Value(1)).current;

  //variable pour stocker la page
  const [views, setViews] = useState([]);
  useEffect(() => {
    //on recupère le contenu de la page
    axios
      .get('https://pixelevent.site/api/views')
      .then(res => setViews(res.data['hydra:member']));
    axios
      .get('https://pixelevent.site/api/lieus')
      .then(res => setHotels(res.data['hydra:member']));
  }, []);

  const image = {
    uri: 'https://pixelevent.site/assets/uploads/figure/',
  };
  //Variable pour stocker les hotel
  const [hotels, setHotels] = useState([]);
  return (
    <>
      <NavBar props={props} />
      {!views ? (
        <Loader />
      ) : (
        views
          .filter(view => view.name === 'accueil')
          .map((view, index) => {
            return (
              <View key={index}>
                <ScrollView>
                  <Animated.View
                    style={{opacity: filtre, transform: [{scale: scalView}]}}>
                    <ImageBackground
                      source={{uri: `${image.uri}${view.headerImage.name}`}}
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
                      {/* Section billet*/}
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('Page1', {
                            pageBilletterie: 'ok',
                          });
                        }}
                        style={styles.bouttonBillet}>
                        <View style={styles.boutton}>
                          <Text style={styles.textbouttonBillet}>
                            Acheter votre billet ici
                          </Text>
                        </View>
                      </TouchableOpacity>
                      {/* FinSection billet*/}
                      {/* Section programme */}
                      {view.pageSections[0] ? (
                        <View style={styles.section}>
                          <View style={CENTER}>
                            <Text style={styles.title}>
                              {view.pageSections[0].title}
                            </Text>
                          </View>
                          <View>
                            <Text style={TEXT}>
                              {view.pageSections[0].content}
                            </Text>
                            <View style={styles.containerProgrammeImages}>
                              {view.pageSections[0].images.map((img, index) => {
                                return (
                                  <Image
                                    key={index}
                                    source={{
                                      uri: `${image.uri}${img.name}`,
                                    }}
                                    style={styles.Programmeimages}
                                  />
                                );
                              })}
                            </View>
                            <View style={CENTER}>
                              <Pressable
                                style={styles.button}
                                onPress={() =>
                                  props.navigation.navigate('Page1', {
                                    pageProgramme: 'ok',
                                  })
                                }>
                                <Text style={styles.textButton}>Programme</Text>
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      ) : (
                        ''
                      )}
                      {/* Fin section programme */}
                      {/* section sponsor */}
                      {view.pageSections[1] ? (
                        <View style={styles.section}>
                          <View style={CENTER}>
                            <Text style={styles.title}>
                              {view.pageSections[1].title}
                            </Text>
                          </View>
                          <View>
                            <Text style={TEXT}>
                              {view.pageSections[1].content}
                            </Text>
                            <FlatList
                              horizontal={true}
                              data={view.pageSections[1].images}
                              keyExtractor={item => item.id}
                              renderItem={({item}) => {
                                return (
                                  <Image
                                    source={{
                                      uri: `${image.uri}${item.name}`,
                                    }}
                                    style={styles.Remercimentimages}
                                  />
                                );
                              }}
                            />
                            <View style={CENTER}>
                              <Pressable
                                style={styles.button}
                                onPress={() =>
                                  props.navigation.navigate('Page1', {
                                    pageSponsor: 'ok',
                                  })
                                }>
                                <Text style={styles.textButton}>Sponsor</Text>
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      ) : (
                        ''
                      )}
                      {/* Fin section sponsor */}

                      {/* Section hotels/restaurants */}
                      {view.pageSections[2] ? (
                        <View style={styles.section}>
                          <View style={CENTER}>
                            <Text style={styles.title}>
                              {view.pageSections[2].title}
                            </Text>
                          </View>
                          <Text style={TEXT}>
                            {view.pageSections[2].content}
                          </Text>
                        </View>
                      ) : (
                        <Text style={styles.title}>Hotel</Text>
                      )}
                      {hotels ? (
                        <FlatList
                          horizontal={true}
                          showsHorizontalScrollIndicator={true}
                          data={hotels.filter(
                            hotel => hotel.category === 'Hotel',
                          )}
                          keyExtractor={item => item.id}
                          renderItem={({item}) => {
                            return <Card props={props} hotel={item} />;
                          }}
                        />
                      ) : (
                        ''
                      )}

                      {/* Fin section hotels/restaurants */}
                      {/* Section map */}
                      {view.pageSections[3] ? (
                        <View style={styles.section}>
                          <View style={CENTER}>
                            <Text style={styles.title}>
                              {view.pageSections[3].title}
                            </Text>
                          </View>
                          <Text style={TEXT}>
                            {view.pageSections[3].content}
                          </Text>
                          <ImageBackground
                            source={
                              view.pageSections[3].images[0]
                                ? {
                                    uri: `${image.uri}${view.pageSections[3].images[0].name}`,
                                  }
                                : ''
                            }
                            style={styles.geolocalisation}>
                            <View style={styles.buttonMap}>
                              <Pressable
                                style={styles.button}
                                onPress={() =>
                                  props.navigation.navigate('Map')
                                }>
                                <Text style={styles.textButton}>Ouvrir</Text>
                              </Pressable>
                            </View>
                          </ImageBackground>
                        </View>
                      ) : (
                        ''
                      )}
                      {/* Fin section map */}

                      {/* Fin section */}
                    </Animated.View>
                  </LinearGradient>
                  <Footer props={props} />
                </ScrollView>
              </View>
            );
          })
      )}
    </>
  );
};
const widthScreen = Dimensions.get('window').width;
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
    marginTop: 40,
    marginLeft: 25,
  },
  bouttonBillet: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    top: -180,
  },
  boutton: {
    backgroundColor: COLORS.orange,
    padding: 20,
    borderRadius: 10,
  },
  textbouttonBillet: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'LibreBaskerville-Bold',
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
    width: widthScreen - 30,
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
