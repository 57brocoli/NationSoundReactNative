import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from '../../../asset/constantes/Couleurs';
import Loader from '../../SousComposants/Loader';
import Billet from '../../SousComposants/Billet';

const Billetterie = ({billets, props}) => {
    return (
        <View>
            {!billets ? (
                <Loader />
            ) : (
                billets.map((billet, index) => {
                    return (
                        <View key={index} style={styles.containerBillet}>
                            <Billet billet={billet} props={props} />
                        </View>
                    );
                })
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    containerBillet: {
        marginVertical: 17,
        backgroundColor: 'grey',
        borderRadius: 10,
    },
    panier: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 10,
        marginTop: 10,
        padding: 15,
    },
    countPanier: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    totalPanier: {
        color: COLORS.orange,
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonPanier: {
        backgroundColor: COLORS.mauveClaire,
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    textButtonPanier: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
export default Billetterie;
