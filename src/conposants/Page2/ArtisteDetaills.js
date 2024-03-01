import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Linking} from 'react-native';
//import des variables de style prédéfinis
import {TITLE} from '../../asset/constantes/Constantes';
import {COLORS} from '../../asset/constantes/Couleurs';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';

const ArtisteDetaills = ({artisteDetaills, lieu}) => {
    if (artisteDetaills) {
        var artiste = artisteDetaills.artiste;
        var day = artisteDetaills.day;
        var episode = artisteDetaills.episode;
    }

    return (
        <>
            <Image
                source={{
                    uri: `https://pixelevent.site/assets/uploads/artiste/${artiste.featuredImage}`,
                }}
                style={styles.imgArtiste}
            />

            <View style={styles.headerDescription}>
                <Text style={TITLE}>{artiste.name}</Text>
                <TouchableOpacity style={styles.playListe} onPress={() => Linking.openURL(artiste.link)}>
                    <MaterialCommunityIcons name="play-circle-outline" color={'white'} size={30} />
                    <Text style={styles.playListeText}>Ecouter un morceau</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.detailConcert}>
                <MaterialCommunityIcons name="calendar-text" color={'white'} size={30} />

                <Text style={styles.playListeText}>{Moment(day.date).format('D MMMM')}</Text>
                <Text style={styles.playListeText}>{Moment(episode.hour).format('H:mm')}</Text>
            </View>
            <View style={styles.separateur} />
            <View style={styles.detailConcert}>
                <MaterialCommunityIcons name="map-marker-outline" color={'white'} size={30} />
                {episode.lieu && episode.lieu.name ? (
                    <Text style={styles.playListeText}>{episode.lieu.name}</Text>
                ) : (
                    <Text style={styles.playListeText}>{lieu}</Text>
                )}
            </View>

            <Text style={styles.descriptionTitle}>A propos</Text>
            <Text style={styles.descriptionArtiste}>{artiste.description}</Text>
        </>
    );
};
const styles = StyleSheet.create({
    imgArtiste: {
        width: '105%',
        height: 330,
        marginTop: 45,
        right: 20,
    },
    headerDescription: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    playListe: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        height: 40,
        width: 170,
        borderRadius: 10,
    },
    playListeText: {
        color: 'white',
        paddingHorizontal: 5,
    },
    separateur: {
        marginHorizontal: 15,
        height: 1,
        backgroundColor: 'white',
        width: 270,
    },
    detailConcert: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
    },
    descriptionTitle: {
        marginTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 15,
        color: COLORS.jaune,
        fontSize: 20,
        fontWeight: 'bold',
    },
    descriptionArtiste: {
        paddingBottom: 15,
        paddingHorizontal: 15,
        color: 'white',
        fontSize: 16,
    },
});
export default ArtisteDetaills;
