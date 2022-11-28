import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FONTS} from '../constantes/Fonts';
import {COLORS} from '../constantes/Couleurs';

const Card = props => {
  const {item} = props;

  return (
    <TouchableOpacity style={styles.card}>
      <Image source={item.src} style={styles.img} />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.containerText}>{item.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: COLORS.mauveClaire,
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
export default Card;
