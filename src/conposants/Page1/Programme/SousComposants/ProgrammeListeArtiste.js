import {FlatList} from 'react-native';
import React from 'react';
import Card from '../../../SousComposants/Card';

const ProgrammeListeArtiste = ({props, day, scene, artisteFiltre}) => {
  return (
    <>
      {artisteFiltre === null ? (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          data={day.episode.filter(episode => episode.lieu.name === scene)}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <Card props={props} data1={day} data2={item} />;
          }}
        />
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          data={day.episode
            .filter(episode => episode.artiste.name === artisteFiltre)
            .filter(episode => episode.lieu.name === scene)}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <Card props={props} data1={day} data2={item} />;
          }}
        />
      )}
    </>
  );
};

export default ProgrammeListeArtiste;
