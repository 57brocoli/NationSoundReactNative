import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {TITLE} from '../../asset/constantes/Constantes';

const BilletDetails = ({billet}) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>UseReducerHook</Text>
            </View>
            <Image
                source={{
                    uri: `https://pixelevent.site/assets/uploads/billet/${billet.featuredImage}`,
                }}
                style={styles.imgArtiste}
            />
            <View style={styles.headerDescription}>
                <Text style={TITLE}>{billet.name}</Text>
                <View style={styles.description}>
                    <Text style={styles.text}>Prix du billet : {billet.price} &euro;</Text>
                    <View style={styles.separateur} />
                    <Text style={styles.text}>{billet.description}</Text>
                </View>
            </View>
        </View>
    );
};
const height = Dimensions.get('window').height - 346;
const styles = StyleSheet.create({
    container: {
        minHeight: height,
    },
    imgArtiste: {
        width: '105%',
        height: 200,
        marginTop: 25,
        right: 20,
    },
    headerDescription: {
        padding: 15,
    },
    description: {
        paddingVertical: 5,
    },
    text: {
        height: 16,
        color: 'white',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    separateur: {
        height: 1,
        backgroundColor: 'white',
        width: 270,
    },
});

export default BilletDetails;
