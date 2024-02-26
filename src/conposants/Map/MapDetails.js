import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../asset/constantes/Couleurs';
import {CENTER} from '../../asset/constantes/Constantes';
import {FONTS} from '../../asset/constantes/Fonts';
import axios from 'axios';
import Moment from 'moment';
import {Button} from 'react-native';

const MapDetails = ({props, marker}) => {
  //variable qui contient le chemin d'acces aux photos du site pixelEvent
  const figureLieu = {
    uri: 'https://pixelevent.site/assets/uploads/lieu/',
  };
  const figureArtiste = {
    uri: 'https://pixelevent.site/assets/uploads/artiste/',
  };
  useEffect(() => {
    axios
      .get('https://pixelevent.site/api/days')
      .then(res => setDays(res.data['hydra:member']));
  }, []);
  const [days, setDays] = useState([]);
  console.log(marker.name);
  return (
    <>
      <View>
        <Image
          source={{uri: `${figureLieu.uri}${marker.featuredImage}`}}
          style={styles.img}
        />
      </View>
      <View style={CENTER}>
        <Text style={styles.title}>{marker.name}</Text>
      </View>
      <View style={styles.contenu}>
        <Text style={styles.description}>Category : {marker.category}</Text>
        <View style={styles.separateur} />
        <Text style={styles.description}>
          Description : {marker.description}
        </Text>
        <View style={styles.separateur} />
        <View>
          {marker.links
            ? marker.links.map((link, index) => {
                return (
                  <Button
                    key={index}
                    onPress={() => Linking.openURL(link.link)}
                    title="Visiter le site internet"
                    color={COLORS.jaune}
                    accessibilityLabel="Learn more about this purple button"
                    style={styles.btn}
                  />
                );
              })
            : ''}
        </View>
      </View>

      {/* section pour le programme */}
      <>
        {marker.category === 'Scene' ? (
          <View>
            <View style={CENTER}>
              <Text style={styles.title}>Programme</Text>
            </View>

            {days.map((day, index) => {
              return (
                <View key={index}>
                  <Text style={styles.progTitle}>{day.name}</Text>
                  <FlatList
                    horizontal={true}
                    style={styles.cards}
                    showsHorizontalScrollIndicator={true}
                    data={marker.episodes.filter(
                      episode => episode.day.name === day.name,
                    )}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                      return (
                        <View>
                          <TouchableOpacity
                            style={styles.card}
                            onPress={() =>
                              props.navigation.navigate('Page2', {
                                day: day,
                                episode: item,
                                lieu: marker.name,
                                artiste: item.artiste,
                              })
                            }>
                            <Image
                              source={{
                                uri: `${figureArtiste.uri}${item.artiste.featuredImage}`,
                              }}
                              style={styles.cardimage}
                            />
                            <View style={styles.containerTitle}>
                              <Text style={styles.cardTitle}>
                                {item.artiste.name}
                              </Text>
                              <Text style={styles.cardTitle}>
                                {Moment(item.hour).format('H:mm')}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                </View>
              );
            })}
          </View>
        ) : (
          ''
        )}
      </>
    </>
  );
};
const styles = StyleSheet.create({
  img: {
    width: '105%',
    height: 250,
    right: 15,
    marginTop: 45,
  },
  title: {
    marginTop: 15,
    fontSize: 26,
    fontFamily: FONTS.titre,
    color: COLORS.jaune,
  },
  contenu: {
    marginVertical: 10,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: 15,
  },
  btn: {
    marginHorizontal: 20,
  },
  separateur: {
    marginHorizontal: 15,
    marginVertical: 7,
    height: 1,
    backgroundColor: 'white',
    width: 270,
  },
  progTitle: {
    marginHorizontal: 15,
    fontSize: 16,
    color: 'white',
  },
  cards: {
    marginStart: 10,
  },
  card: {
    width: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: COLORS.mauveFonce,
  },
  cardimage: {
    width: 150,
    borderRadius: 10,
    height: 120,
  },
  cardTitle: {
    color: COLORS.jaune,
    fontFamily: FONTS.titre,
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
  },
});
export default MapDetails;
