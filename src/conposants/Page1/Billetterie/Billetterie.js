import React from 'react';
import {View, StyleSheet} from 'react-native';
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
});
export default Billetterie;
