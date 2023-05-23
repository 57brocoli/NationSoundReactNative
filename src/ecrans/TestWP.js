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
  const {width} = useWindowDimensions();

  useEffect(() => {
    axios
      .get('https://nationsounds.fr/wp-json/wp/v2/posts?_embed&per_page=15')
      .then(res => setTest(res.data));
  });
  const [test, setTest] = useState();

  useEffect(() => {
    axios
      .get('https://nationsounds.fr/wp-json/wp/v2/posts?_embed')
      .then(res => setListeMarker(res.data));
  }, []);
  const [listeMarker, setListeMarker] = useState();

  return (
    <ScrollView style={{flex: 1}}>
      <TouchableOpacity onPress={() => console.log()}>
        <Text>test</Text>
      </TouchableOpacity>

      {test ? (
        test
          .filter(test => test.categories[0] === 32)
          .map((post, index) => {
            return (
              <View
                key={index}
                style={{marginHorizontal: 15, marginVertical: 5}}>
                <Text style={{color: 'orange', fontSize: 16}}>
                  {post.title.rendered}
                </Text>
                <Text>{}</Text>
                <Image
                  style={{width: 150, height: 150}}
                  source={{
                    uri: post._embedded['wp:featuredmedia']['0'].source_url,
                  }}
                />
                <RenderHtml
                  contentWidth={width}
                  source={{html: post.content.rendered}}
                  tagsStyles={tagsStyles}
                />
              </View>
            );
          })
      ) : (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}

      <Text style={{color: 'red'}}>test suivant</Text>

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
