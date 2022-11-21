import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {CENTER} from '../constantes/Constantes';
import {FONTS} from '../constantes/Fonts';

const CardHotelRestau = props => {
  const {item} = props;

  return (
    <View style={styles.card}>
      <Image source={item.src} style={styles.img} />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.containerText}>{item.description}</Text>
      <View style={CENTER}>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>Details</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'blue',
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
    fontFamily: FONTS.text,
    color: 'white',
    marginHorizontal: 5,
    textAlign: 'center',
  },
  button: {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#1c043c',
  },
  textButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default CardHotelRestau;
