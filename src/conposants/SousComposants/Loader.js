import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../../asset/constantes/Couleurs';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={COLORS.jaune} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    height: 400,
    justifyContent: 'center',
  },
});

export default Loader;
