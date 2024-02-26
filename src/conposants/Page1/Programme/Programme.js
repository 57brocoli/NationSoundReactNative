import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
//import de moment pour formater la date
import Moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import ProgrammeListeArtiste from './SousComposants/ProgrammeListeArtiste';
import ProgrammeFiltre from './SousComposants/ProgrammeFiltre';

function Programme({programme, props}) {
  const [scenes, setScenes] = useState([]);
  const [artistes, setArtistes] = useState([]);
  useEffect(() => {
    axios
      .get('https://pixelevent.site/api/lieus')
      .then(res => setScenes(res.data['hydra:member']));
    axios
      .get('https://pixelevent.site/api/artistes')
      .then(res => setArtistes(res.data['hydra:member']));
  }, []);
  //Variable qui filtre et trie pour récupéré les nom des scene
  const allMapScenes = scenes
    .filter(scene => scene.category === 'Scene')
    .map(x => x.name);
  //Variable qui contient uniquement les nom des artistes
  const artisteNames = artistes.map(x => x.name);

  const [dayFilter, setDayFilter] = useState(null);

  const [sceneFilter, setSceneFilter] = useState(null);

  const [artisteFiltre, setArtisteFiltre] = useState(null);

  return (
    <View>
      {programme && (
        <View>
          <View>
            <Text style={styles.title}>NationSound</Text>
            <View style={styles.filtreBox}>
              <TouchableOpacity
                style={styles.filtre}
                onPress={() => setDayFilter(null)}>
                <Text style={styles.textWhite}>Voir tous</Text>
              </TouchableOpacity>
              {programme.map((day, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.filtre}
                    onPress={() => setDayFilter(day.name)}>
                    <Text style={styles.textWhite}>{day.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          {programme && dayFilter === null
            ? programme.map((day, index) => {
                return (
                  <View key={index} style={styles.marginTop}>
                    <View style={styles.headerDay}>
                      <Text style={styles.day}>{day.name}</Text>
                      <Text style={styles.dates}>
                        {Moment(day.date).format('D MMMM YYYY')}
                      </Text>
                      <ProgrammeFiltre
                        allMapScenes={allMapScenes}
                        sceneFilter={sceneFilter}
                        setSceneFilter={setSceneFilter}
                        artisteNames={artisteNames}
                        artisteFiltre={artisteFiltre}
                        setArtisteFiltre={setArtisteFiltre}
                      />
                    </View>
                    <View style={styles.hr} />
                    {allMapScenes && sceneFilter
                      ? allMapScenes
                          .filter(scene => scene === sceneFilter)
                          .map(scene => {
                            return (
                              <View key={scene.id}>
                                <Text style={styles.dates}>{scene}</Text>
                                <ProgrammeListeArtiste
                                  artisteFiltre={artisteFiltre}
                                  props={props}
                                  day={day}
                                  scene={scene}
                                />
                              </View>
                            );
                          })
                      : allMapScenes.map(scene => {
                          return (
                            <View key={scene.id}>
                              <Text style={styles.dates}>{scene}</Text>
                              <ProgrammeListeArtiste
                                artisteFiltre={artisteFiltre}
                                props={props}
                                day={day}
                                scene={scene}
                              />
                            </View>
                          );
                        })}
                  </View>
                );
              })
            : programme
                .filter(day => day.name === dayFilter)
                .map((day, index) => {
                  return (
                    <View key={index} style={styles.marginTop}>
                      <View style={styles.headerDay}>
                        <Text style={styles.dates}>{day.name}</Text>
                        <Text style={styles.dates}>
                          {Moment(day.date).format('D MMMM YYYY')}
                        </Text>
                        <ProgrammeFiltre
                          allMapScenes={allMapScenes}
                          sceneFilter={sceneFilter}
                          setSceneFilter={setSceneFilter}
                          artisteNames={artisteNames}
                          artisteFiltre={artisteFiltre}
                          setArtisteFiltre={setArtisteFiltre}
                        />
                      </View>
                      <View style={styles.hr} />
                      {allMapScenes && sceneFilter
                        ? allMapScenes
                            .filter(scene => scene === sceneFilter)
                            .map(scene => {
                              return (
                                <View key={scene.id}>
                                  <Text style={styles.dates}>{scene}</Text>
                                  <ProgrammeListeArtiste
                                    artisteFiltre={artisteFiltre}
                                    props={props}
                                    day={day}
                                    scene={scene}
                                  />
                                </View>
                              );
                            })
                        : allMapScenes.map(scene => {
                            return (
                              <View key={scene.id}>
                                <Text style={styles.dates}>{scene}</Text>
                                <ProgrammeListeArtiste
                                  artisteFiltre={artisteFiltre}
                                  props={props}
                                  day={day}
                                  scene={scene}
                                />
                              </View>
                            );
                          })}
                    </View>
                  );
                })}
        </View>
      )}
    </View>
  );
}

//Variable pour les styles du contenu de la View
const styles = StyleSheet.create({
  day: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    fontSize: 22,
  },
  dates: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
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
  headerDay: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  marginTop: {marginTop: 10},
  hr: {
    backgroundColor: 'white',
    height: 2,
    margin: 10,
  },
});

export default Programme;
