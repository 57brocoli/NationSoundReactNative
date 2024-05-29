import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
//import de moment pour formater la date
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHeader, fetchProgramme} from '../../../../redux/reducers/sectionContenuReducer';
import HeaderPage from '../../../Conposants/Page1/HeaderPage';
import Journe from './SousComposants/Journe';

function Programme({props}) {
    // Importation du reducer
    const dispatch = useDispatch();
    const programme = useSelector(state => state.programme.programme[0]);
    const views = useSelector(state => state.views.views);
    useEffect(() => {
        dispatch(fetchProgramme());
        dispatch(fetchHeader());
    }, [dispatch]);
    if (views) {
        var prog = views.find(x => x.name === 'programme');
    }

    const [dayFilter, setDayFilter] = useState(null);

    return (
        <View>
            <HeaderPage data={prog} />

            {programme && (
                <>
                    <View>
                        <Text style={styles.title}>NationSound</Text>
                        <View style={styles.filtreBox}>
                            <TouchableOpacity style={styles.filtre} onPress={() => setDayFilter(null)}>
                                <Text style={styles.textWhite}>Voir tous</Text>
                            </TouchableOpacity>
                            {programme.map(day => {
                                return (
                                    <TouchableOpacity
                                        key={day.id}
                                        style={styles.filtre}
                                        onPress={() => setDayFilter(day.name)}>
                                        <Text style={styles.textWhite}>{day.name}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                    <View style={styles.conteinerProg}>
                        {programme && dayFilter === null
                            ? programme.map(day => {
                                  return (
                                      <View key={day.id}>
                                          <Journe day={day} props={props} />
                                      </View>
                                  );
                              })
                            : programme
                                  .filter(day => day.name === dayFilter)
                                  .map(day => {
                                      return (
                                          <View key={day.id}>
                                              <Journe day={day} props={props} />
                                          </View>
                                      );
                                  })}
                    </View>
                </>
            )}
        </View>
    );
}

//Variable pour les styles du contenu de la View
const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    filtreBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    filtre: {
        marginVertical: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    textWhite: {
        color: 'white',
    },
});

export default Programme;
