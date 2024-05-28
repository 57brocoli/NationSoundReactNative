import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import Loader from '../SousComposants/Loader';

const Sponsor = ({sponsors}) => {
    const imgSponsor = {
        uri: 'https://pixelevent.site/assets/uploads/sponsors/',
    };
    const imgSponsorDiapo = {
        uri: 'https://pixelevent.site/assets/uploads/sponsors/diapo/',
    };
    return (
        <View>
            {sponsors ? (
                sponsors
                    .filter(sponsor => sponsor.event.name === 'Nation Sound')
                    .map((sponsor, index) => {
                        return (
                            <ImageBackground
                                key={index}
                                source={{
                                    uri: `${imgSponsorDiapo.uri}${sponsor.imageSponsors[0].name}`,
                                }}
                                style={styles.image}>
                                <View style={styles.sectionSponsor}>
                                    <Text style={styles.text}>{sponsor.name}</Text>
                                    <Image
                                        source={{
                                            uri: `${imgSponsor.uri}${sponsor.logo}`,
                                        }}
                                        style={styles.logo}
                                    />
                                </View>
                            </ImageBackground>
                        );
                    })
            ) : (
                <Loader />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    image: {
        height: 150,
        width: '103%',
        right: 20,
    },
    sectionSponsor: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'RaphLanokFuture-PvDx',
        textAlign: 'center',
        fontSize: 50,
        color: 'white',
        marginTop: 25,
    },
    logo: {
        marginTop: 40,
        marginStart: 20,
        height: 50,
        width: 50,
    },
});
export default Sponsor;
