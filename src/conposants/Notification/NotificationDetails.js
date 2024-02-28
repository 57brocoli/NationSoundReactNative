import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {COLORS} from '../../asset/constantes/Couleurs';
import {FONTS} from '../../asset/constantes/Fonts';
import {CENTER} from '../../asset/constantes/Constantes';
import LinearGradient from 'react-native-linear-gradient';
//import des composant exterieurs
import Footer from '../Footer';
//import des variables de style prédéfinis
import {STYLESHEADER} from '../../asset/constantes/StylesHeader';
import {STYLESMENU} from '../../asset/constantes/StyleMenu';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import de Firebase
import auth from '@react-native-firebase/auth';

const NotificationDetails = props => {
    const {notificationTitle, notificationBody, notificationImg} =
        props.route.params;

    //Variable pour afficher/masquer le menu
    const [showMenu, setShowMenu] = useState(false);
    //Varible d'animation lors de l'affichage/masquage de menu
    const slideMenu = useRef(new Animated.Value(260)).current;
    const scralView = useRef(new Animated.Value(1)).current;
    const filtre = useRef(new Animated.Value(1)).current;
    //Variable du header
    const Header = () => {
        return (
            <View style={STYLESHEADER.header}>
                <View style={STYLESHEADER.nav}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Accueil1')}>
                        <Image
                            source={require('../../asset/img/logo.jpg')}
                            style={STYLESHEADER.iconNav}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setShowMenu(!showMenu);
                            Animated.timing(slideMenu, {
                                toValue: showMenu ? 260 : 0,
                                duration: 300,
                                useNativeDriver: true,
                            }).start();
                            Animated.timing(scralView, {
                                toValue: showMenu ? 1 : 0.95,
                                duration: 300,
                                useNativeDriver: true,
                            }).start();
                            Animated.timing(filtre, {
                                toValue: showMenu ? 1 : 0.5,
                                duration: 300,
                                useNativeDriver: true,
                            }).start();
                        }}>
                        <MaterialCommunityIcons
                            name={'menu'}
                            color={'white'}
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    //Variable pour le menu
    const Menu = () => {
        // variable pour se deconnecter
        const onSingOut = () => {
            auth()
                .signOut()
                .then(() => {
                    console.log('User signed out!');
                    props.navigation.navigate('LogIn');
                });
        };

        return (
            <Animated.View
                style={{
                    flexGrow: 1,
                    backgroundColor: COLORS.mauveClaire,
                    position: 'absolute',
                    height: 623,
                    top: 70,
                    right: 0,
                    transform: [{translateX: slideMenu}],
                }}>
                <LinearGradient
                    colors={[COLORS.mauveClaire, COLORS.mauveFonce]}
                    style={{paddingHorizontal: 15, paddingVertical: 10}}>
                    <View style={STYLESMENU.containerMenu}>
                        {/* container de la photo de Profile */}
                        <TouchableOpacity
                            style={STYLESMENU.containerUserIcon}
                            onPress={() => props.navigation.navigate('Profil')}>
                            <Image
                                source={require('../../asset/icons/userIcon.png')}
                                style={STYLESMENU.userIcon}
                            />
                            <Text style={STYLESMENU.lienVersProfil}>
                                Voir Profile
                            </Text>
                        </TouchableOpacity>
                        {/* fin container de la photo de Profile */}

                        {/* container du nom de l'utilisateur */}
                        {auth() ? (
                            <Text style={STYLESMENU.nameUser}>
                                {auth().currentUser.displayName}
                            </Text>
                        ) : (
                            ''
                        )}
                        {/* fin container du nom de l'utilisateur */}

                        {/* container des liens de navigation*/}
                        <View style={STYLESMENU.containerLink}>
                            <TouchableOpacity
                                style={STYLESMENU.lienNav}
                                onPress={() =>
                                    props.navigation.navigate('Accueil1')
                                }>
                                <MaterialCommunityIcons
                                    name="home"
                                    color={COLORS.mauveClaire}
                                    size={30}
                                />
                                <Text style={STYLESMENU.textLink}>Accueil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={STYLESMENU.lienNav}
                                onPress={() =>
                                    props.navigation.navigate('Billetterie')
                                }>
                                <MaterialCommunityIcons
                                    name="ticket"
                                    color={COLORS.mauveClaire}
                                    size={30}
                                />
                                <Text style={STYLESMENU.textLink}>
                                    Billetterie
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={STYLESMENU.lienNav}
                                onPress={() =>
                                    props.navigation.navigate('Programme')
                                }>
                                <MaterialCommunityIcons
                                    name="clipboard-list"
                                    color={COLORS.mauveClaire}
                                    size={30}
                                />
                                <Text style={STYLESMENU.textLink}>
                                    Programme
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={STYLESMENU.lienNav}
                                onPress={() =>
                                    props.navigation.navigate('Information')
                                }>
                                <MaterialCommunityIcons
                                    name="information"
                                    color={COLORS.mauveClaire}
                                    size={30}
                                />
                                <Text style={STYLESMENU.textLink}>
                                    Information
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={STYLESMENU.lienNav}
                                onPress={() =>
                                    props.navigation.navigate('Map')
                                }>
                                <MaterialCommunityIcons
                                    name="map"
                                    color={COLORS.mauveClaire}
                                    size={30}
                                />
                                <Text style={STYLESMENU.textLink}>Map</Text>
                            </TouchableOpacity>
                        </View>
                        {/* fin container des liens de navigation*/}

                        {/*container se deconnecter*/}
                        <TouchableOpacity
                            style={STYLESMENU.containerLinkDeconnexion}
                            onPress={() => onSingOut()}>
                            <MaterialCommunityIcons
                                name="logout"
                                color={'white'}
                                size={30}
                            />
                            <Text style={STYLESMENU.textDeconnexion}>
                                Déconnexion
                            </Text>
                        </TouchableOpacity>
                        {/*container se deconnecter*/}
                    </View>
                </LinearGradient>
            </Animated.View>
        );
    };
    return (
        <SafeAreaView>
            <Header />
            <ScrollView>
                <LinearGradient
                    colors={['#f1793c', '#6c24dd', '#5dd29b']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0.91}}>
                    <TouchableOpacity
                        style={styles.buttonRetour}
                        onPress={() => props.navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={40}
                            color={'white'}
                        />
                        <Text style={styles.textButtonRetour}>Retour</Text>
                    </TouchableOpacity>
                    <Animated.View
                        style={{
                            opacity: filtre,
                            transform: [{scale: scralView}],
                        }}>
                        {/* Header */}
                        <Image
                            source={{uri: notificationImg}}
                            style={styles.header}
                        />
                        {/* Fin header */}

                        {/* Contenu de la notification */}
                        <View style={styles.container}>
                            <View style={CENTER}>
                                <Text style={styles.notificationTitle}>
                                    {notificationTitle}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.notificationBody}>
                                    {notificationBody}
                                </Text>
                            </View>
                        </View>
                        {/* Fin contenu de la notification */}
                    </Animated.View>
                </LinearGradient>
                <Footer />
            </ScrollView>
            <Menu />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    header: {
        marginTop: 55,
        height: 210,
        width: '105%',
        opacity: 0.8,
        right: 15,
    },
    buttonRetour: {
        position: 'absolute',
        top: 70,
        zIndex: 1,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: COLORS.mauveClaire,
        width: 120,
    },
    textButtonRetour: {
        color: 'white',
        fontSize: 18,
    },
    container: {
        paddingHorizontal: 15,
        marginTop: 20,
    },
    notificationTitle: {
        fontSize: 26,
        fontFamily: FONTS.titre,
        color: COLORS.jaune,
    },
    notificationBody: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 15,
        marginBottom: 30,
    },
});

export default NotificationDetails;
