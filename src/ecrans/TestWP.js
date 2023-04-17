import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {COLORS} from '../constantes/Couleurs';

const TestWP = props => {
  useEffect(() => {
    axios
      .get('https://nationsounds.fr/wp-json/wp/v2/posts?_embed')
      .then(res => setListeMarker(res.data));
  }, []);
  const [listeMarker, setListeMarker] = useState();
  const {width} = useWindowDimensions();
  useEffect(() => {
    axios
      .get('https://nationsounds.fr/wp-json/wp/v2/posts?per_page=15')
      .then(res => setTest(res.data));
  });
  const [test, setTest] = useState();
  useEffect(() => {
    axios
      .get('https://nationsounds.fr/wp-json/wp/v2/pages')
      .then(res => setTest1(res.data));
  });
  const [test1, setTest1] = useState();
  // const coord = listeMarker
  //   ? listeMarker
  //       .filter(marker => marker.categories[0] === 32)
  //       .map(marker => marker.content.rendered)
  //   : '';
  // const latitude = coord ? coord[0].slice(4, 19) : '';
  // const longitude = coord ? coord[0].slice(20, 38) : '';
  // const description = coord ? coord[0].slice(49, 82) : '';

  return (
    <ScrollView style={{flex: 1}}>
      <TouchableOpacity onPress={() => console.log(test1)}>
        <Text>test</Text>
      </TouchableOpacity>
      {test1 ? (
        test1.map((page, index) => {
          return (
            <View key={index}>
              <Text>{page.title.rendered}</Text>
            </View>
          );
        })
      ) : (
        <Text>manquante</Text>
      )}
      {test
        ? test.map((post, index) => {
            return (
              <View
                key={index}
                style={{marginHorizontal: 15, marginVertical: 5}}>
                <Text style={{color: 'orange', fontSize: 16}}>
                  {post.title.rendered}
                </Text>
                <Image
                  style={{width: 150, height: 150}}
                  source={{
                    uri: post._links['wp:featuredmedia']['0'].source_url,
                  }}
                />
              </View>
            );
          })
        : ''}
      {listeMarker ? (
        listeMarker
          .filter(marker => marker.categories[0] === 32)
          .map((marker, index) => {
            return (
              <View key={index}>
                <Text style={styles.headerTitle}>{marker.title.rendered}</Text>
                <Image
                  style={{width: 250, height: 250}}
                  source={{
                    uri: marker._embedded['wp:featuredmedia']['0'].source_url,
                  }}
                />
                <RenderHtml
                  contentWidth={width}
                  source={{html: marker.content.rendered.slice(37)}}
                  tagsStyles={tagsStyles}
                />
                <Text>{marker.content.rendered.slice(4, 12)}</Text>
                <Text>{marker.content.rendered.slice(14, 21)}</Text>
                <Text>{marker.content.rendered.slice(32, 33)}</Text>
              </View>
            );
          })
      ) : (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  header: {marginTop: 0},
  headerImg: {
    width: '105%',
    height: 200,
  },
  headerContainerText: {
    padding: 10,
  },
  headerTitle: {
    color: COLORS.orange,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
// style du RenderHtml
const tagsStyles = {
  body: {
    color: 'black',
    fontSize: 16,
  },
};

export default TestWP;
