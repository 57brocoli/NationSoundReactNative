import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const ProgrammeFiltre = ({
  setSceneFilter,
  sceneFilter,
  allMapScenes,
  artisteNames,
  artisteFiltre,
  setArtisteFiltre,
}) => {
  const [openSceneFilter, setOpenSceneFilter] = useState(false);
  const [openArtisteFiltre, setOpenArtisteFiltre] = useState(false);
  return (
    <View style={styles.box}>
      <TouchableOpacity
        onPress={() => {
          setOpenSceneFilter(!openSceneFilter);
          setOpenArtisteFiltre(false);
        }}>
        <Text style={styles.dates}>Scene</Text>
      </TouchableOpacity>
      {openSceneFilter && (
        <View style={styles.filterSceneBox}>
          {sceneFilter && (
            <TouchableOpacity
              style={styles.padding}
              onPress={() => {
                setSceneFilter(null);
                setOpenSceneFilter(!openSceneFilter);
              }}>
              <Text>Tous</Text>
            </TouchableOpacity>
          )}
          {allMapScenes.map((scene, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.padding}
                onPress={() => {
                  setSceneFilter(scene);
                  setOpenSceneFilter(!openSceneFilter);
                }}>
                <Text>{scene}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <TouchableOpacity
        onPress={() => {
          setOpenArtisteFiltre(!openArtisteFiltre);
          setOpenSceneFilter(false);
        }}>
        <Text style={styles.dates}>Artiste</Text>
      </TouchableOpacity>
      {openArtisteFiltre && (
        <View style={styles.filterArtisteBox}>
          {artisteFiltre && (
            <TouchableOpacity
              style={styles.padding}
              onPress={() => {
                setArtisteFiltre(null);
                setOpenArtisteFiltre(!openArtisteFiltre);
              }}>
              <Text>Tous</Text>
            </TouchableOpacity>
          )}
          <ScrollView style={styles.height}>
            {artisteNames.map((artiste, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.padding}
                  onPress={() => {
                    setArtisteFiltre(artiste);
                    setOpenArtisteFiltre(!openArtisteFiltre);
                  }}>
                  <Text>{artiste}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    flexDirection: 'row',
  },
  dates: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  filterSceneBox: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'white',
    right: 70,
    top: 20,
    width: 80,
  },
  filterArtisteBox: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'white',
    right: 10,
    top: 20,
    width: 80,
  },
  height: {
    height: 180,
  },
  padding: {
    padding: 10,
  },
});
export default ProgrammeFiltre;
