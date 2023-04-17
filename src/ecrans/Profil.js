import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../constantes/Couleurs';
import {FONTS} from '../constantes/Fonts';
import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';

const Profil = props => {
  useEffect(() => {
    auth();
  });
  const onSingOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        props.navigation.navigate('LogIn');
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.buttonRetour}
            onPress={() => props.navigation.navigate('Accueil1')}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={40}
              color={'white'}
            />
            <Text style={styles.textButtonRetour}>Retour</Text>
          </TouchableOpacity>

          <View style={styles.imgContainer}>
            <Image
              source={require('../asset/icons/userIcon.png')}
              style={styles.imgUser}
            />
            <View>
              <Text style={styles.textImg}>
                {auth().currentUser.displayName}
              </Text>
            </View>
          </View>
        </View>
        {/* Fin header */}

        {/* section notification/billets */}
        <View>
          <TouchableOpacity
            style={styles.touche}
            onPress={() => props.navigation.navigate('TestWP')}>
            <MaterialCommunityIcons name="ticket" size={40} color={'white'} />
            <Text style={styles.textTouche}>Mes billets</Text>
          </TouchableOpacity>
        </View>
        {/* Fin section notification/billets */}

        {/* section user parametres */}
        <View style={styles.userParametre}>
          <Text>Nom</Text>
          <Text style={styles.userTextParametre}>
            {auth().currentUser.displayName}
          </Text>
        </View>
        <View style={styles.userParametre}>
          <Text>Adresse mail</Text>
          <Text style={styles.userTextParametre}>
            {auth().currentUser.email}
          </Text>
        </View>
        <View style={styles.userParametre}>
          <Text>Numero de téléphone</Text>
          <Text style={styles.userTextParametre}>''</Text>
        </View>
        <View style={styles.userParametre}>
          <Text>Date de naissance</Text>
          <Text style={styles.userTextParametre}>''</Text>
        </View>
        <View style={styles.userParametre}>
          <TouchableOpacity
            style={styles.buttonLogout}
            onPress={() => onSingOut()}>
            <MaterialCommunityIcons name="logout" color={'black'} size={30} />
            <Text>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
        {/* fin section user parametres */}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.mauveClaire,
  },
  buttonRetour: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: COLORS.mauveClaire,
    width: 120,
  },
  textButtonRetour: {
    color: 'white',
    fontSize: 18,
  },
  imgContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 30,
  },
  imgUser: {
    height: 110,
    width: 110,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  textImg: {
    color: COLORS.jaune,
    fontSize: 26,
    fontFamily: FONTS.titre,
    marginTop: 75,
  },
  toucheContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  touche: {
    backgroundColor: COLORS.vert,
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textTouche: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userParametre: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  userTextParametre: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  buttonLogout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Profil;
