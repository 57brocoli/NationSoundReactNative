import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import NavBar from '../Conposants/NavBar';
import BouttonRetour from '../Conposants/SousComposants/BouttonRetour';
import LinearGradient from 'react-native-linear-gradient';
import {Animated} from 'react-native';
import ArtisteDetaills from '../Conposants/Page2/ArtisteDetaills';
import Footer from '../Conposants/Footer';
import MapDetails from '../Conposants/Map/MapDetails';
import ArticleDetails from '../Conposants/Page2/ArticleDetails';
import BilletDetails from '../Conposants/Page2/BilletDetails';

const Page2 = props => {
  const {billet, artiste, day, episode, lieu, marker, article} =
    props.route.params;

  const billetDetails = {
    billet: billet,
  };
  const artisteDetaills = {
    artiste: artiste,
    day: day,
    episode: episode,
  };
  const mapDetails = {
    marker: marker,
  };
  const articleDetails = {
    article: article,
  };

  const scralView = useRef(new Animated.Value(1)).current;
  const filtre = useRef(new Animated.Value(1)).current;
  return (
    <View>
      <NavBar props={props} />
      <BouttonRetour props={props} />
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={['#f1793c', '#6c24dd', '#5dd29b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0.91}}>
          <Animated.View
            style={{
              opacity: filtre,
              transform: [{scale: scralView}],
            }}>
            {billetDetails.billet === undefined ? (
              ''
            ) : (
              <BilletDetails props={props} billet={billet} />
            )}
            {artisteDetaills.artiste === undefined ? (
              ''
            ) : (
              <ArtisteDetaills
                props={props}
                episode={episode}
                artiste={artiste}
                day={day}
                lieu={lieu}
              />
            )}
            {mapDetails.marker === undefined ? (
              ''
            ) : (
              <MapDetails props={props} marker={marker} />
            )}
            {articleDetails.article === undefined ? (
              ''
            ) : (
              <ArticleDetails props={props} article={article} />
            )}
          </Animated.View>
        </LinearGradient>
        <Footer />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  imgArtiste: {
    width: '105%',
    height: 330,
    marginTop: 45,
    right: 20,
  },
});
export default Page2;
