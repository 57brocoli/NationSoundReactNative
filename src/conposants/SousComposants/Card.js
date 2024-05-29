import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../asset/constantes/Couleurs';
import {FONTS} from '../../asset/constantes/Fonts';

const Card = ({props, data1, data2, hotel}) => {
    const image = {
        uri: 'https://pixelevent.site/assets/uploads/artiste/',
    };
    const imageHotel = {
        uri: 'https://pixelevent.site/assets/uploads/lieu/',
    };
    return (
        <View>
            {data1 === undefined ? (
                ''
            ) : (
                <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                        props.navigation.navigate('Page2', {
                            day: data1,
                            episode: data2,
                            artiste: data2.artiste,
                        })
                    }>
                    <Image
                        source={{
                            uri: `${image.uri}${data2.artiste.featuredImage}`,
                        }}
                        style={styles.img}
                    />
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>{data2.artiste.name}</Text>
                    </View>
                </TouchableOpacity>
            )}

            {hotel === undefined ? (
                ''
            ) : (
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => {
                        props.navigation.navigate('Page2', {
                            marker: hotel,
                        });
                    }}>
                    <Image
                        source={{
                            uri: `${imageHotel.uri}${hotel.featuredImage}`,
                        }}
                        style={styles.img}
                    />
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>{hotel.name}</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 170,
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
