import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ProgrammeFiltre from './ProgrammeFiltre';
import moment from 'moment';
import ArtisteListe from './ArtisteListe';

const Journe = ({day, props}) => {
    if (day) {
        //On récupère les épisode
        var episodes = day.episode;

        //On récupère les artistes
        const artistesAll = episodes.map(a => a.artiste.name);
        //On supprime les doublons
        var artistes = artistesAll.filter((x, i) => artistesAll.indexOf(x) === i);

        //On récupére les scènes
        const allScenes = episodes.map(o => o.lieu.name);
        //Puis on supprime les doublons
        var scènes = allScenes.filter((x, i) => allScenes.indexOf(x) === i);
    }

    const [sceneFilter, setSceneFilter] = useState(null);

    const [artisteFiltre, setArtisteFiltre] = useState(null);

    return (
        <>
            {day && (
                <View>
                    <View style={styles.headerDay}>
                        <Text style={styles.day}>{day.name}</Text>
                        <Text style={styles.dates}>{moment(day.date).format('D MMMM YYYY')}</Text>
                        <ProgrammeFiltre
                            allMapScenes={scènes}
                            sceneFilter={sceneFilter}
                            setSceneFilter={setSceneFilter}
                            artisteNames={artistes}
                            artisteFiltre={artisteFiltre}
                            setArtisteFiltre={setArtisteFiltre}
                        />
                    </View>
                    <View style={styles.hr} />
                    <View>
                        {sceneFilter === null
                            ? scènes.map((scene, index) => {
                                  return (
                                      <View key={index}>
                                          <Text style={styles.sceneTitre}>{scene}</Text>
                                          <ArtisteListe
                                              episodes={episodes}
                                              scene={scene}
                                              artisteFiltre={artisteFiltre}
                                              props={props}
                                              day={day}
                                          />
                                      </View>
                                  );
                              })
                            : scènes
                                  .filter(scen => scen === sceneFilter)
                                  .map((scene, index) => {
                                      return (
                                          <View key={index}>
                                              <Text style={styles.sceneTitre}>{scene}</Text>
                                              <ArtisteListe
                                                  episodes={episodes}
                                                  scene={scene}
                                                  artisteFiltre={artisteFiltre}
                                                  props={props}
                                                  day={day}
                                              />
                                          </View>
                                      );
                                  })}
                    </View>
                </View>
            )}
        </>
    );
};
const styles = StyleSheet.create({
    headerDay: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 20,
    },
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
    hr: {
        backgroundColor: 'white',
        height: 2,
        margin: 10,
    },
    sceneTitre: {
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 10,
    },
});
export default Journe;
