import {View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import {COLORS} from '../../asset/constantes/Couleurs';
import {FONTS} from '../../asset/constantes/Fonts';
import {CENTER} from '../../asset/constantes/Constantes';
import LinearGradient from 'react-native-linear-gradient';
//import des composant exterieurs
import Footer from '../Footer';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavBar from '../NavBar';

const NotificationDetails = props => {
    const {notificationTitle, notificationBody, notificationImg} = props.route.params;

    return (
        <SafeAreaView>
            <NavBar props={props} />
            <TouchableOpacity style={styles.buttonRetour} onPress={() => props.navigation.navigate('Notification')}>
                <MaterialCommunityIcons name="chevron-left" size={40} color={'white'} />
                <Text style={styles.textButtonRetour}>Retour</Text>
            </TouchableOpacity>
            <ScrollView>
                <LinearGradient
                    colors={['#f1793c', '#6c24dd', '#5dd29b']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0.91}}
                    style={styles.view}>
                    {/* Header */}
                    {notificationImg ? (
                        <Image source={{uri: notificationImg}} style={styles.header} />
                    ) : (
                        <View style={styles.headerNone} />
                    )}
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
const height = Dimensions.get('window').height - 442;
const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        flex: 1,
    },
    header: {
        marginTop: 55,
        height: 210,
        width: '105%',
        opacity: 0.8,
        right: 15,
    },
    headerNone: {
        marginTop: 100,
    },
    buttonRetour: {
        position: 'absolute',
        top: 70,
        zIndex: 1,
        borderBottomRightRadius: 10,
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
    container: {
        paddingHorizontal: 15,
        marginTop: 20,
        flex: 1,
        height: height,
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
