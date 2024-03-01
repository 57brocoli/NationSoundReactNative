import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../asset/constantes/Couleurs';
import Loader from '../SousComposants/Loader';
import {TEXT} from '../../asset/constantes/Constantes';

const Header = ({folder, data}) => {
    return (
        <View>
            {!folder || !data ? (
                <Loader />
            ) : (
                <View>
                    <ImageBackground source={{uri: `${folder}${data.headerImage.name}`}} style={styles.background}>
                        <View>
                            <Text style={styles.logo}>{data.name}</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.headerTexte}>
                        <Text style={TEXT}>{data.headerText}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    headerTexte: {
        padding: 10,
    },
    background: {
        zIndex: 1,
        flex: 1,
        marginTop: 70,
        height: 170,
    },
    logo: {
        fontFamily: 'RaphLanokFuture-PvDx',
        fontSize: 70,
        color: COLORS.jaune,
        marginTop: 20,
        marginLeft: 20,
        textAlign: 'center',
    },
});
export default Header;
