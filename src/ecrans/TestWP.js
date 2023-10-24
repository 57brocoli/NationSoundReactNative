import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {COLORS} from '../constantes/Couleurs';

const TestWP = props => {
  // test api
  useEffect(() => {
    axios
      .get('https://pixelevent.site/api/articles/104')
      .then(res => setData(res.data));
  }, []);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://pixelevent.site/api/articles')
      .then(res => setArticles(res.data['hydra:member']));
  }, []);
  const [articles, setArticles] = useState();

  const {width} = useWindowDimensions();

  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <TouchableOpacity onPress={() => console.log(data)}>
          <Text>test</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log(articles)}>
          <Text>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log(width)}>
          <Text>testcategory</Text>
        </TouchableOpacity>
      </View>
      {data ? (
        <Text>{data.title}</Text>
      ) : (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}

      {articles ? (
        articles.map((article, index) => {
          return (
            <View key={index}>
              <Text style={styles.title}>{article.title}</Text>
              <Image
                style={{width: width, height: 250, paddingBottom: 10}}
                source={{
                  uri: `https://pixelevent.site/assets/uploads/articles/${article.featuredImage}`,
                }}
              />
              <Text style={styles.text}>{article.introduction}</Text>
              <Text style={styles.text}>{article.content}</Text>
              <Text style={styles.text}>{article.categories.name}</Text>
              {article.images ? (
                // <Text>oui</Text>
                article.images.map((image, index) => {
                  return (
                    <Image
                      key={index}
                      style={{
                        marginHorizontal: 15,
                        width: width - 30,
                        height: 250,
                      }}
                      source={{
                        uri: `https://pixelevent.site/assets/uploads/articles/diapo/${image.name}`,
                      }}
                    />
                  );
                })
              ) : (
                <View style={styles.activityIndicator}>
                  <ActivityIndicator size="large" color="#00ff00" />
                </View>
              )}
            </View>
          );
        })
      ) : (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}

      {/* {listeMarker ? (
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
      )} */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  header: {marginTop: 0},
  headerImg: {
    width: '105%',
    height: 200,
  },
  title: {
    color: 'orange',
    fontSize: 24,
    paddingBottom: 10,
    textAlign: 'center',
  },
  text: {
    marginHorizontal: 10,
    color: 'black',
    fontSize: 16,
    paddingTop: 10,
    textAlign: 'justify',
  },
  headerContainerText: {
    padding: 10,
  },
  headerTitle: {
    color: COLORS.orange,
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: 200,
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
