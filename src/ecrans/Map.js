import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
//import de Maps
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import des styles
import {COLORS} from '../constantes/Couleurs';

const Map = () => {
  // Variable des lieux de l'evenement
  const [entrer, setEntrer] = useState({
    latitude: 43.631564178751,
    longitude: 3.8415581688366904,
  });
  const [scene1, setscene1] = useState({
    latitude: 43.63360637742207,
    longitude: 3.8423908336419297,
  });
  const [scene2, setscene2] = useState({
    latitude: 43.63222415949075,
    longitude: 3.8392472848302934,
  });
  const [scene3, setscene3] = useState({
    latitude: 43.634336299907126,
    longitude: 3.8400197609887847,
  });
  const [scene4, setscene4] = useState({
    latitude: 43.634173232887,
    longitude: 3.836886941012683,
  });
  const [scene5, setscene5] = useState({
    latitude: 43.63581941296659,
    longitude: 3.836243210880607,
  });

  return (
    <View style={styles.flex}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        style={styles.flex}
        region={{
          latitude: 43.63317,
          longitude: 3.83895,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}>
        <Marker
          title={'Nation sound'}
          description={'Entrer'}
          coordinate={entrer}>
          <Image
            source={require('../asset/img/logo.jpg')}
            style={{height: 35, width: 35, borderRadius: 10}}
          />
        </Marker>
        <Marker title={'Scene 1'} coordinate={scene1}>
          <MaterialCommunityIcons
            name="map-marker"
            color={COLORS.orange}
            size={35}
          />
        </Marker>
        <Marker title={'Scene 2'} coordinate={scene2}>
          <MaterialCommunityIcons
            name="map-marker"
            color={COLORS.orange}
            size={35}
          />
        </Marker>
        <Marker title={'Scene 3'} coordinate={scene3}>
          <MaterialCommunityIcons
            name="map-marker"
            color={COLORS.orange}
            size={35}
          />
        </Marker>
        <Marker title={'Scene 4'} coordinate={scene4}>
          <MaterialCommunityIcons
            name="map-marker"
            color={COLORS.orange}
            size={35}
          />
        </Marker>
        <Marker title={'Scene 5'} coordinate={scene5}>
          <MaterialCommunityIcons
            name="map-marker"
            color={COLORS.orange}
            size={35}
          />
        </Marker>
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
{
  /* AIzaSyCW7M2mUdB93GuXGPgJcKZyvvaTggIcqcg */
}
export default Map;
