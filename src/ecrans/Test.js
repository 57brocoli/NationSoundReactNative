import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBillets, fetchProgramme} from '../../redux/reducers/sectionContenuReducer';
import {COLORS} from '../asset/constantes/Couleurs';
import {Colors} from 'react-native-paper';
import Journe from '../Conposants/Page1/Programme/SousComposants/Journe';

const Test = props => {
    const dispatch = useDispatch();
    const programme = useSelector(state => state.programme.programme[0]);

    useEffect(() => {
        dispatch(fetchProgramme());
    }, [dispatch]);
    // console.log(programme);
    return (
        <ScrollView>
            <View style={styles.conteinerTitre}>
                <Text style={styles.titre}>Programme</Text>
            </View>
            <View style={styles.conteinerProg}>
                {programme &&
                    programme.map(day => {
                        return (
                            <View key={day.id}>
                                <Journe day={day} props={props} />
                            </View>
                        );
                    })}
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    titre: {
        fontFamily: 'RaphLanokFuture-PvDx',
        fontSize: 70,
        color: COLORS.jaune,
        marginTop: 20,
        marginLeft: 20,
        textAlign: 'center',
    },
    conteinerTitre: {
        backgroundColor: COLORS.mauveFonce,
    },
    conteinerProg: {
        backgroundColor: COLORS.mauveClaire,
    },
});
export default Test;
