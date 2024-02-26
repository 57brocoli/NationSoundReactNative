import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../asset/constantes/Couleurs';
import Loader from '../SousComposants/Loader';

const Header = ({folder, file, data}) => {
  return (
    <View>
      {!file || !folder || !data ? (
        <Loader />
      ) : (
        <ImageBackground
          source={{uri: `${folder}${file}`}}
          style={styles.background}>
          <View>
            <Text style={styles.logo}>{data.name}</Text>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    zIndex: 1,
    flex: 1,
    marginTop: 52,
    height: 170,
    width: '103%',
    right: 20,
  },
  logo: {
    fontFamily: 'RaphLanokFuture-PvDx',
    fontSize: 70,
    color: COLORS.jaune,
    marginTop: 30,
    marginLeft: 20,
    textAlign: 'center',
  },
});
export default Header;
