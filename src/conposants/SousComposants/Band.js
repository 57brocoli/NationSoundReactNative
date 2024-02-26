import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../asset/constantes/Couleurs';
import {FONTS} from '../../asset/constantes/Fonts';

const Band = ({props, hotel}) => {
  return (
    <ImageBackground source={hotel.src} style={styles.image}>
      <View style={styles.sectionSponsor}>
        <Text style={styles.text}>{hotel.title}</Text>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 150,
    width: '103%',
    right: 20,
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
});
export default Band;
