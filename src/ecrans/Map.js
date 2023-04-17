import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
//import de Maps
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import des styles
import {COLORS} from '../constantes/Couleurs';
//import de la geolocalisation
import Geolocation from '@react-native-community/geolocation';
// import {FakeMarker} from '../data/FakeMarker';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';

/* AIzaSyCW7M2mUdB93GuXGPgJcKZyvvaTggIcqcg */

const Map = props => {
  // Variable de l'entrer de l'evenement
  const entrer = {latitude: 43.63156, longitude: 3.84155};

  // var pour les input de type radio
  const [selectedRadio, setSelectedRadio] = useState('0');
  // var pour les label des input de type radio
  const radios = [
    {id: 1, title: 'Entrer', icon: 'door'},
    {id: 2, title: 'Scene', icon: 'music-note'},
    {id: 3, title: 'Toilette', icon: 'toilet'},
    {id: 4, title: 'Bars', icon: 'beer'},
    {id: 5, title: 'Poste de secours', icon: 'mortar-pestle-plus'},
  ];

  //variable de la position de l'utilisateur
  const [location, setLocation] = useState();
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  /////////////////////////////////////////////////////variable pour recupéré l'autaurisation de geolocalisation//////////////////////////////
  useEffect(() => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(position => {
          console.log(position);
          setLocation(position);
        });
      }
    });
  }, []);

  /////////////////////////////////////////////////////variable pour recupéré les donées de WordPress//////////////////////////////////
  useEffect(() => {
    axios
      .get('https://nationsounds.fr/wp-json/wp/v2/posts?_embed')
      .then(res => setListeMarker(res.data));
  }, []);
  const [listeMarker, setListeMarker] = useState();
  const {width} = useWindowDimensions();

  return (
    <View style={styles.flex}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.flex}
        initialRegion={{
          latitude: 43.63317,
          longitude: 3.83895,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}>
        {/******************************* Variable pour afficher les points prevenant de wordPress *************************************/}
        {listeMarker
          ? listeMarker
              // filtre uniquement les acticles avec la catégories32
              .filter(marker => marker.categories[0] === 32)
              // filtre uniquement marqueur en fonction du filtre choisit
              .filter(marker =>
                marker.content.rendered.slice(32, 33).includes(selectedRadio),
              )
              .map((marker, index) => {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: JSON.parse(
                        marker.content.rendered.slice(4, 12),
                      ),
                      longitude: JSON.parse(
                        marker.content.rendered.slice(13, 20),
                      ),
                    }}
                    title={marker.title.rendered}>
                    <Image
                      source={{
                        uri: marker._embedded['wp:featuredmedia']['0']
                          .source_url,
                      }}
                      style={styles.imageMarker}
                    />
                  </Marker>
                );
              })
          : ''}

        {/*************************************** Varible pour afficher les points provenent de la fakedata *********************************/}
        {/* {FakeMarker.filter(marker =>
          marker.categories.includes(selectedRadio),
        ).map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}>
            <MaterialCommunityIcons
              name={marker.icon}
              color={marker.colors}
              size={30}
            />
          </Marker>
        ))} */}
        {/*************************************** Varible pour afficher l'entrer du festival' *********************************/}
        <Marker
          title={'Nation sound'}
          description={'Entrer'}
          coordinate={entrer}>
          <Image
            source={require('../asset/img/logo.jpg')}
            style={styles.imageMarker}
          />
        </Marker>

        {/* ***********************************Marqueur de l'utilisateur ***************************************************/}
        {location ? (
          <Marker
            title={'Moi'}
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}>
            <MaterialCommunityIcons
              name="map-marker-account"
              color={COLORS.orange}
              size={35}
            />
          </Marker>
        ) : (
          ''
        )}
      </MapView>

      {/******************************************** Boutons de filtre ************************************************/}
      <View style={styles.boutonsFiltre}>
        <FlatList
          horizontal={true}
          data={radios}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  style={styles.radio}
                  onPress={() => {
                    setSelectedRadio(item.id);
                  }}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    color={'indigo'}
                    size={20}
                  />
                  <Text style={styles.radioText}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        {selectedRadio > 0 && (
          <TouchableOpacity
            style={styles.radioRéinitialiser}
            onPress={() => setSelectedRadio('0')}>
            <MaterialCommunityIcons name="reload" color={'indigo'} size={20} />
            <Text style={styles.radioText}>Réinitialiser</Text>
          </TouchableOpacity>
        )}
      </View>

      {/***********************************************  cards des differents points *************************************************/}
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showHorizontalScrollIndicator={false}
        snapToAlignment="center"
        style={styles.cardsView}>
        {listeMarker
          ? listeMarker
              .filter(marker => marker.categories[0] === 32)
              .filter(marker =>
                marker.content.rendered.slice(32, 33).includes(selectedRadio),
              )
              .map((marker, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.cards}
                    onPress={() => {
                      props.navigation.navigate('MapDetails', {
                        titre: marker.title.rendered,
                        image:
                          marker._embedded['wp:featuredmedia']['0'].source_url,
                        description: marker.content.rendered,
                      });
                    }}>
                    <Image
                      style={styles.imageCards}
                      source={{
                        uri: marker._embedded['wp:featuredmedia']['0']
                          .source_url,
                      }}
                    />
                    <Text style={styles.content}>{marker.title.rendered}</Text>
                    <RenderHtml
                      contentWidth={width}
                      source={{html: marker.content.rendered.slice(37)}}
                      tagsStyles={tagsStyles}
                    />
                    <View
                      style={{
                        marginHorizontal: 10,
                        marginBottom: 10,
                        paddingHorizontal: 8,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: 'indigo',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black'}}>
                        Clicker pour plus de details
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
          : ''}
      </Animated.ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  imageMarker: {
    height: 35,
    width: 35,
    borderRadius: 10,
  },
  boutonsFiltre: {
    position: 'absolute',
    top: '1%',
    alignItems: 'center',
    width: 350,
  },
  radio: {
    marginHorizontal: 13,
    paddingHorizontal: 8,
    paddingVertical: 9,
    marginVertical: 7,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 3,
    flexDirection: 'row',
  },
  radioText: {
    fontSize: 16,
    marginHorizontal: 3,
    fontWeight: 'bold',
    color: 'indigo',
  },
  radioRéinitialiser: {
    marginHorizontal: 13,
    paddingHorizontal: 13,
    paddingVertical: 8,
    marginVertical: 5,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 3,
    flexDirection: 'row',
  },
  cardsView: {
    position: 'absolute',
    top: '60%',
  },
  cards: {
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    width: 300,
  },
  imageCards: {
    width: '100%',
    height: 115,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    color: 'indigo',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16,
    marginHorizontal: 10,
  },
});
// style du RenderHtml
const tagsStyles = {
  body: {
    color: 'black',
    fontSize: 14,
    marginVertical: -12,
    marginHorizontal: 10,
    width: 280,
    height: 48,
  },
};

export default Map;
