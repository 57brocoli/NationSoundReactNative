import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    FlatList,
    Pressable,
    ImageBackground,
    Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
//import des variables de style prédéfinis
import {FONTS} from '../asset/constantes/Fonts';
import {CENTER, TEXT} from '../asset/constantes/Constantes';
import {COLORS} from '../asset/constantes/Couleurs';
import Footer from '../Conposants/Footer';
import Card from '../Conposants/SousComposants/Card';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Loader from '../Conposants/SousComposants/Loader';
import NavBar from '../Conposants/NavBar';

const Accueil = props => {
    //variable pour stocker la page et les Lieux
    const [views, setViews] = useState([]);
    const [lieux, setLieux] = useState([]);
    useEffect(() => {
        //on recupère le contenu de la page
        axios.get('https://pixelevent.site/api/views').then(res => setViews(res.data['hydra:member']));
        axios.get('https://pixelevent.site/api/lieus').then(res => setLieux(res.data['hydra:member']));
    }, []);

    if (views) {
        var accueilExtractArray = views.filter(view => view.name === 'accueil');
        var data = accueilExtractArray[0];
        var hotels = lieux.filter(lieu => lieu.category === 'Hotel');
    }

    const image = {
        uri: 'https://pixelevent.site/assets/uploads/figure/',
    };

    return (
        <>
            <NavBar props={props} />
            <ScrollView>
                {data ? (
                    <>
                        <ImageBackground
                            source={{uri: `${image.uri}${data.headerImage.name}`}}
                            style={styles.background}>
                            <Text style={styles.logo}>Nation Sound</Text>
                            {/* Section billet*/}
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate('Page1', {
                                        pageBilletterie: 'ok',
                                    });
                                }}
                                style={styles.bouttonBillet}>
                                <View style={styles.boutton}>
                                    <Text style={styles.textbouttonBillet}>Acheter votre billet ici</Text>
                                </View>
                            </TouchableOpacity>
                            {/* FinSection billet*/}
                        </ImageBackground>
                        <LinearGradient
                            colors={['#f1793c', '#6c24dd', '#5dd29b']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            style={styles.LinearGradient}>
                            {data.pageSections.map(section => {
                                return (
                                    <View key={section.id}>
                                        {section.display === 'style1' && (
                                            <View style={styles.section}>
                                                <View style={CENTER}>
                                                    <Text style={styles.title}>{section.title}</Text>
                                                </View>
                                                <View>
                                                    <Text style={TEXT}>{section.content}</Text>
                                                    <FlatList
                                                        horizontal={true}
                                                        data={section.images}
                                                        keyExtractor={item => item.id}
                                                        renderItem={({item}) => {
                                                            return (
                                                                <Image
                                                                    source={{
                                                                        uri: `${image.uri}${item.name}`,
                                                                    }}
                                                                    style={styles.Remercimentimages}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                    <View style={CENTER}>
                                                        {section.title === 'Nos remerciement' && (
                                                            <Pressable
                                                                style={styles.button}
                                                                onPress={() =>
                                                                    props.navigation.navigate('Page1', {
                                                                        pageSponsor: 'ok',
                                                                    })
                                                                }>
                                                                <Text style={styles.textButton}>Sponsor</Text>
                                                            </Pressable>
                                                        )}
                                                        {section.title === 'Hotel' && hotels ? (
                                                            <FlatList
                                                                horizontal={true}
                                                                showsHorizontalScrollIndicator={true}
                                                                data={hotels}
                                                                keyExtractor={item => item.id}
                                                                renderItem={({item}) => {
                                                                    return <Card props={props} hotel={item} />;
                                                                }}
                                                            />
                                                        ) : (
                                                            ''
                                                        )}
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                        {section.display === 'style2' && (
                                            <View style={styles.section}>
                                                <View style={CENTER}>
                                                    <Text style={styles.title}>{section.title}</Text>
                                                </View>
                                                <Text style={TEXT}>{section.content}</Text>
                                                <ImageBackground
                                                    source={
                                                        section.images[0]
                                                            ? {
                                                                  uri: `${image.uri}${section.images[0].name}`,
                                                              }
                                                            : ''
                                                    }
                                                    style={styles.geolocalisation}>
                                                    <View style={styles.buttonMap}>
                                                        <Pressable
                                                            style={styles.button}
                                                            onPress={() => props.navigation.navigate('Map')}>
                                                            <Text style={styles.textButton}>Ouvrir</Text>
                                                        </Pressable>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                        )}
                                        {section.display === 'style3' && (
                                            <View style={styles.section}>
                                                <View style={CENTER}>
                                                    <Text style={styles.title}>{section.title}</Text>
                                                </View>
                                                <View>
                                                    <Text style={TEXT}>{section.content}</Text>
                                                    <View style={styles.containerProgrammeImages}>
                                                        {section.images.map((img, index) => {
                                                            return (
                                                                <Image
                                                                    key={index}
                                                                    source={{uri: `${image.uri}${img.name}`}}
                                                                    style={styles.Programmeimages}
                                                                />
                                                            );
                                                        })}
                                                    </View>
                                                    <View style={CENTER}>
                                                        <Pressable
                                                            style={styles.button}
                                                            onPress={() =>
                                                                props.navigation.navigate('Page1', {
                                                                    pageProgramme: 'ok',
                                                                })
                                                            }>
                                                            <Text style={styles.textButton}>Programme</Text>
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                );
                            })}
                        </LinearGradient>
                    </>
                ) : (
                    <>
                        <Loader />
                    </>
                )}
                <Footer props={props} />
            </ScrollView>
        </>
    );
};
const widthScreen = Dimensions.get('window').width;
const styles = StyleSheet.create({
    background: {
        zIndex: 1,
        flex: 1,
        height: 700,
        width: '100%',
    },
    LinearGradient: {
        paddingTop: 10,
    },
    logo: {
        fontFamily: 'RaphLanokFuture-PvDx',
        fontSize: 70,
        color: 'white',
        marginTop: 90,
        marginHorizontal: 5,
    },
    bouttonBillet: {
        alignItems: 'center',
        width: '100%',
        top: 380,
    },
    boutton: {
        backgroundColor: COLORS.orange,
        padding: 20,
        borderRadius: 10,
    },
    textbouttonBillet: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'LibreBaskerville-Bold',
    },
    title: {
        fontFamily: FONTS.titre,
        fontSize: 24,
        color: 'white',
    },
    section: {
        paddingHorizontal: 15,
    },
    containerProgrammeImages: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    Programmeimages: {
        height: 170,
        width: 90,
        borderRadius: 10,
    },
    button: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#1c043c',
    },
    textButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    Remercimentimages: {
        marginTop: 10,
        width: widthScreen - 30,
        height: 200,
        borderRadius: 10,
    },
    geolocalisation: {
        height: 200,
        marginHorizontal: -15,
    },
    buttonMap: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 140,
    },
});

export default Accueil;
