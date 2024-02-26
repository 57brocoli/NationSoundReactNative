import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../asset/constantes/Couleurs';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Billet = ({billet, props}) => {
  const [countBillets, setCountBillets] = useState(0);
  const total = countBillets * billet.price;

  const upCountBillets = () => {
    setCountBillets(countBillets + 1);
  };
  const lessCountBillets = () => {
    countBillets > 0 && setCountBillets(countBillets - 1);
  };
  const img = {
    uri: 'https://pixelevent.site/assets/uploads/billet/',
  };
  return (
    <ImageBackground
      source={{uri: `${img.uri}${billet.featuredImage}`}}
      style={styles.billetImg}>
      <View style={styles.containerBilletsinfos}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Page2', {
              billet: billet,
            })
          }>
          {/* <TouchableOpacity onPress={() => console.log(total)}>
            <Text>total</Text>
          </TouchableOpacity> */}
          <Text style={styles.billetText}>{billet.name}</Text>
          <Text style={styles.billetText}>prix : {billet.price} &euro;</Text>
          <Text style={styles.billetTextDetail}>Voir detail</Text>
        </TouchableOpacity>
        <View>
          <View style={styles.containterCount}>
            <TouchableOpacity
              onPress={() => {
                lessCountBillets();
              }}>
              <Text style={styles.billetCount}>-</Text>
            </TouchableOpacity>
            <Text style={styles.billetCount}>{countBillets}</Text>
            <TouchableOpacity
              onPress={() => {
                upCountBillets();
              }}>
              <Text style={styles.billetCount}>+</Text>
            </TouchableOpacity>
          </View>
          {total > 0 ? (
            <View style={styles.totalBox}>
              <Text style={styles.totalBillet}>Total : {total} &euro;</Text>
            </View>
          ) : (
            ''
          )}
          <View style={styles.boxHyperlink}>
            <Text style={styles.hyperlink}>Acheter</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  billetImg: {
    width: '100%',
    height: 120,
    opacity: 0.8,
    borderRadius: 10,
  },
  containerBilletsinfos: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  billetText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  billetTextDetail: {
    color: 'white',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  totalBox: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginTop: 10,
    padding: 2,
  },
  totalBillet: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containterCount: {
    flexDirection: 'row',
    marginTop: 0,
  },
  billetCount: {
    marginHorizontal: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  boxHyperlink: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingVertical: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  hyperlink: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Billet;
