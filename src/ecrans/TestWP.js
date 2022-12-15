import {View, Text, ActivityIndicator, Image} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {COLORS} from '../constantes/Couleurs';
import {TouchableOpacity} from 'react-native';
import {CENTER, TITLE} from '../constantes/Constantes';

const TestWP = props => {
  useEffect(() => {
    axios
      .get('https://nationsounds.fr/wp-json/wp/v2/posts?_embed')
      .then(res => setListeArticles(res.data));
  }, []);
  const [listeArticles, setListeArticles] = useState([]);
  const {width} = useWindowDimensions();

  return (
    <View>
      <ScrollView>
        {/* <Text
          onPress={() => {
            console.log(listeArticles);
          }}>
          Log
        </Text> */}
        {!listeArticles ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          listeArticles
            .filter(article => article.categories[0] === 1)
            .map((article, index) => {
              return (
                <View
                  style={styles.header}
                  onPress={() => props.navigation.navigate('')}
                  key={index}>
                  {/* Image en haut */}
                  {!listeArticles ? (
                    <ActivityIndicator size="large" color="#00ff00" />
                  ) : (
                    <Image
                      style={styles.headerImg}
                      source={{
                        uri: article._embedded['wp:featuredmedia']['0']
                          .source_url,
                      }}
                    />
                  )}
                  {/* Text en bas */}
                  <View style={styles.headerContainerText}>
                    <View>
                      <Text style={TITLE}>{article.title.rendered}</Text>
                    </View>
                    <RenderHtml
                      contentWidth={width}
                      source={{html: article.content.rendered}}
                      tagsStyles={tagsStyles}
                    />
                  </View>
                </View>
              );
            })
        )}
      </ScrollView>
    </View>
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
    color: COLORS.jaune,
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
