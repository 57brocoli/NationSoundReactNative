import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class Map1 extends Component {
    render() {
        return (
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    style={styles.flex}
                    initialRegion={{
                        latitude: 43.63317,
                        longitude: 3.83895,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.04,
                    }}>
                    {/******************************* Variable pour afficher les points prevenant de l'api *************************************/}
                </MapView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    imageMarker: {
        height: 35,
        width: 35,
        borderRadius: 10,
    },
    boutonsFiltre: {
        position: 'absolute',
        top: '1%',
        alignItems: 'center',
        width: 350,
    },
    radio: {
        marginHorizontal: 13,
        paddingHorizontal: 8,
        paddingVertical: 9,
        marginVertical: 7,
        borderRadius: 50,
        backgroundColor: 'white',
        elevation: 3,
        flexDirection: 'row',
    },
    radioText: {
        fontSize: 16,
        marginHorizontal: 3,
        fontWeight: 'bold',
        color: 'indigo',
    },
    radioRéinitialiser: {
        marginHorizontal: 13,
        paddingHorizontal: 13,
        paddingVertical: 8,
        marginVertical: 5,
        borderRadius: 50,
        backgroundColor: 'white',
        elevation: 3,
        flexDirection: 'row',
    },
    cardsView: {
        position: 'absolute',
        top: '65%',
    },
    cards: {
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 10,
        width: 250,
    },
    imageCards: {
        width: '100%',
        height: 105,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    content: {
        color: 'indigo',
        fontWeight: 'bold',
        marginTop: 5,
        fontSize: 16,
        marginHorizontal: 10,
    },
    buttonCard: {
        marginHorizontal: 10,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'indigo',
        alignItems: 'center',
    },
    buttonCardText: {
        color: 'black',
    },
});
