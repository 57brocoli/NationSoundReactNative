import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../asset/constantes/Couleurs';

const ArtisteListe = ({episodes, scene, artisteFiltre, props, day}) => {
    const image = {
        uri: 'https://pixelevent.site/assets/uploads/artiste/',
    };
    return (
        <FlatList
            data={
                artisteFiltre === null
                    ? episodes.filter(ep => ep.lieu.name === scene)
                    : episodes.filter(ep => ep.artiste.name === artisteFiltre).filter(ep => ep.lieu.name === scene)
            }
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            props.navigation.navigate('Page2', {
                                artiste: item.artiste,
                                day: day.date,
                                episode: item,
                            })
                        }>
                        <Image
                            source={{
                                uri: `${image.uri}${item.artiste.featuredImage}`,
                            }}
                            style={styles.img}
                        />
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>{item.artiste.name}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
};
const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
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
});
export default ArtisteListe;
