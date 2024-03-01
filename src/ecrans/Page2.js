import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import NavBar from '../Conposants/NavBar';
import BouttonRetour from '../Conposants/SousComposants/BouttonRetour';
import LinearGradient from 'react-native-linear-gradient';
import ArtisteDetaills from '../Conposants/Page2/ArtisteDetaills';
import Footer from '../Conposants/Footer';
import MapDetails from '../Conposants/Map/MapDetails';
import ArticleDetails from '../Conposants/Page2/ArticleDetails';
import BilletDetails from '../Conposants/Page2/BilletDetails';

const Page2 = props => {
    const {billet, artiste, day, episode, lieu, marker, article} = props.route.params;

    const billetDetails = {
        billet: billet,
    };
    const artisteDetaills = {
        artiste,
        day,
        episode,
    };
    const mapDetails = {
        marker: marker,
    };
    const articleDetails = {
        article: article,
    };

    return (
        <View>
            <NavBar props={props} />
            <BouttonRetour props={props} />
            <ScrollView style={styles.container}>
                <LinearGradient colors={['#f1793c', '#6c24dd', '#5dd29b']} start={{x: 0, y: 0}} end={{x: 1, y: 0.91}}>
                    {billetDetails.billet && <BilletDetails props={props} billet={billet} />}
                    {artisteDetaills && <ArtisteDetaills artisteDetaills={artisteDetaills} lieu={lieu} />}
                    {mapDetails.marker && <MapDetails props={props} marker={marker} />}
                    {articleDetails.article && <ArticleDetails props={props} article={article} />}
                </LinearGradient>
                <Footer />
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    imgArtiste: {
        width: '105%',
        height: 330,
        marginTop: 45,
        right: 20,
    },
});
export default Page2;
