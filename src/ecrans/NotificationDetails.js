import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../constantes/Couleurs';
import {FONTS} from '../constantes/Fonts';
import {CENTER} from '../constantes/Constantes';
import LinearGradient from 'react-native-linear-gradient';
import Footer from '../conposants/Footer';

const NotificationDetails = props => {
  const {notificationTitle, notificationBody, notificationImg} =
    props.route.params;
  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient
          colors={['#f1793c', '#6c24dd', '#5dd29b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0.91}}>
          {/* Header */}
          <Image source={{uri: notificationImg}} style={styles.header} />
          {/* Fin header */}

          {/* Contenu de la notification */}
          <View style={styles.container}>
            <View style={CENTER}>
              <Text style={styles.notificationTitle}>{notificationTitle}</Text>
            </View>
            <View>
              <Text style={styles.notificationBody}>{notificationBody}</Text>
            </View>
          </View>
          {/* Fin contenu de la notification */}
        </LinearGradient>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 210,
    width: '100%',
    opacity: 0.8,
  },
  container: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  notificationTitle: {
    fontSize: 26,
    fontFamily: FONTS.titre,
    color: COLORS.jaune,
  },
  notificationBody: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 15,
    marginBottom: 30,
  },
});

export default NotificationDetails;
