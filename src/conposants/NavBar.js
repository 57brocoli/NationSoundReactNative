/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Animated, useWindowDimensions, StyleSheet} from 'react-native';
import React, {useState, useRef} from 'react';
import {STYLESHEADER} from '../asset/constantes/StylesHeader';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../asset/constantes/Couleurs';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

const NavBar = ({props}) => {
    //Variable pour afficher/masquer le menu
    const [showMenu, setShowMenu] = useState(false);
    const slideMenu = useRef(new Animated.Value(260)).current;
    const slideMenuPaysage = useRef(new Animated.Value(260)).current;
    const scralView = useRef(new Animated.Value(1)).current;
    const filtre = useRef(new Animated.Value(1)).current;

    // fonction pour se deconnecter
    const onSingOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
                props.navigation.navigate('LogIn');
            });
    };

    // variable pour récuperer les dimentions de l'ecran
    const windowDimensions = useWindowDimensions();
    // variable pour déterminer si l'ecran est en portrait ou en paysage
    const isPortrait = windowDimensions.height > windowDimensions.width;
    // hauteur de l'ecran
    const height = windowDimensions.height;

    // fonction pour ouvrir ou fermer le menu
    const handle = x => {
        var a = 0;
        if (isPortrait) {
            a = 260;
        } else {
            a = -300;
        }
        Animated.timing(x, {
            toValue: showMenu ? a : 0,
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
    };

    return (
        <View style={STYLESHEADER.header}>
            <View style={STYLESHEADER.nav}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Accueil1')}>
                    <Image source={require('../asset/img/logo.jpg')} style={STYLESHEADER.iconNav} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setShowMenu(!showMenu);
                        // eslint-disable-next-line no-lone-blocks
                        {
                            isPortrait ? handle(slideMenu) : handle(slideMenuPaysage);
                        }
                    }}>
                    <MaterialCommunityIcons name={showMenu ? 'close' : 'menu'} color={'white'} size={50} />
                </TouchableOpacity>
            </View>
            {isPortrait ? (
                <Animated.View
                    style={{
                        flexGrow: 1,
                        backgroundColor: COLORS.mauveClaire,
                        position: 'absolute',
                        top: 70,
                        right: 0,
                        transform: [{translateX: slideMenu}],
                    }}>
                    <LinearGradient
                        colors={[COLORS.mauveClaire, COLORS.mauveFonce]}
                        style={{paddingHorizontal: 15, paddingVertical: 10}}>
                        {/* <ScrollView></ScrollView> */}
                        <View style={styles.containerMenu}>
                            {/* <ScrollView> */}
                            {/* container de la photo de Profile */}
                            <TouchableOpacity
                                style={styles.containerUserIcon}
                                onPress={() => props.navigation.navigate('Profil')}>
                                <Image source={require('../asset/img/userIcon.png')} style={styles.userIcon} />
                                <View style={styles.contenair}>
                                    {/* container du nom de l'utilisateur */}
                                    <Text style={styles.nameUser}>{auth().currentUser.displayName}</Text>
                                    <Text style={styles.lienVersProfil}>Voir Profile</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.containerLink}>
                                <TouchableOpacity
                                    style={styles.lienNav}
                                    onPress={() => props.navigation.navigate('Accueil1')}>
                                    <MaterialCommunityIcons name="home" color={COLORS.mauveClaire} size={30} />
                                    <Text style={styles.textLink}>Accueil</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.lienNav}
                                    onPress={() =>
                                        props.navigation.navigate('Page1', {
                                            pageBilletterie: 'ok',
                                        })
                                    }>
                                    <MaterialCommunityIcons name="ticket" color={COLORS.mauveClaire} size={30} />
                                    <Text style={styles.textLink}>Billetterie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.lienNav}
                                    onPress={() =>
                                        props.navigation.navigate('Page1', {
                                            pageProgramme: 'ok',
                                        })
                                    }>
                                    <MaterialCommunityIcons
                                        name="clipboard-list"
                                        color={COLORS.mauveClaire}
                                        size={30}
                                    />
                                    <Text style={styles.textLink}>Programme</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.lienNav}
                                    onPress={() =>
                                        props.navigation.navigate('Page1', {
                                            pageInformation: 'ok',
                                        })
                                    }>
                                    <MaterialCommunityIcons name="information" color={COLORS.mauveClaire} size={30} />
                                    <Text style={styles.textLink}>Actualités / FAQ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.lienNav}
                                    onPress={() =>
                                        props.navigation.navigate('Page1', {
                                            pageApropos: 'ok',
                                        })
                                    }>
                                    <MaterialCommunityIcons name="balloon" color={COLORS.mauveClaire} size={30} />
                                    <Text style={styles.textLink}>A propos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.lienNav}
                                    onPress={() => props.navigation.navigate('Map')}>
                                    <MaterialCommunityIcons name="map" color={COLORS.mauveClaire} size={30} />
                                    <Text style={styles.textLink}>Map</Text>
                                </TouchableOpacity>
                            </View>
                            {/* fin container des liens de navigation*/}

                            {/*container se deconnecter*/}
                            <TouchableOpacity style={styles.containerLinkDeconnexion} onPress={() => onSingOut()}>
                                <MaterialCommunityIcons name="logout" color={'white'} size={30} />
                                <Text style={styles.textDeconnexion}>Déconnexion</Text>
                            </TouchableOpacity>
                            {/*container se deconnecter*/}
                            {/* </ScrollView> */}
                        </View>
                    </LinearGradient>
                </Animated.View>
            ) : (
                <Animated.View
                    style={{
                        flexGrow: 1,
                        zIndex: -1,
                        position: 'absolute',
                        top: 70,
                        width: '100%',
                        transform: [{translateY: slideMenuPaysage}],
                    }}>
                    <LinearGradient
                        colors={[COLORS.mauveClaire, COLORS.mauveFonce]}
                        style={{paddingHorizontal: 15, paddingVertical: 10, height: height - 153}}>
                        {/* <ScrollView></ScrollView> */}
                        <View style={styles.containerMenu2}>
                            <View style={styles.leftContain}>
                                {/* container de la photo de Profile */}
                                <TouchableOpacity
                                    style={styles.containerUserIcon2}
                                    onPress={() => props.navigation.navigate('Profil')}>
                                    <Image source={require('../asset/img/userIcon.png')} style={styles.userIcon2} />
                                    <View style={styles.contenair}>
                                        {/* container du nom de l'utilisateur */}
                                        <Text style={styles.nameUser}>{auth().currentUser.displayName}</Text>
                                        <Text style={styles.lienVersProfil}>Voir Profile</Text>
                                    </View>
                                </TouchableOpacity>
                                {/*container se deconnecter*/}
                                <TouchableOpacity style={styles.containerLinkDeconnexion2} onPress={() => onSingOut()}>
                                    <MaterialCommunityIcons name="logout" color={'white'} size={30} />
                                    <Text style={styles.textDeconnexion}>Déconnexion</Text>
                                </TouchableOpacity>
                                {/*container se deconnecter*/}
                            </View>
                            <View style={styles.containerLink2}>
                                <TouchableOpacity
                                    style={styles.lienNav2}
                                    onPress={() => props.navigation.navigate('Accueil1')}>
                                    <MaterialCommunityIcons name="home" color={COLORS.mauveClaire} size={30} />
                                    <Text style={styles.textLink}>Accueil</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.lienNav2}
                                    onPress={() =>
                                        props.navigation.navigate('Page1', {
                                            pageBilletterie: 'ok',
                                        })
                                    }>
                                    <MaterialCommunityIcons name="ticket" color={COLORS.mauveClaire} size={30} />
                                    <Text style={styles.textLink}>Billetterie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.lienNav2}
                                    onPress={() =>
                                        props.navigation.navigate('Page1', {
                                            pageProgramme: 'ok',
                                        })
                                    }>
                                    <MaterialCommunityIcons
                                        name="clipboard-list"
                                        color={COLORS.mauveClaire}
                                        size={30}
                                    />
                                    <Text style={styles.textLink}>Programme</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.lienNav2}
                                    onPress={() =>
                                        props.navigation.navigate('Page1', {
                                            pageInformation: 'ok',
                                        })
                                    }>
                                    <MaterialCommunityIcons name="information" color={COLORS.mauveClaire} size={30} />
                                    <Text style={styles.textLink}>Actualités / FAQ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.lienNav2}
                                    onPress={() =>
                                        props.navigation.navigate('Page1', {
                                            pageApropos: 'ok',
                                        })
                                    }>
                                    <MaterialCommunityIcons name="balloon" color={COLORS.mauveClaire} size={30} />
                                    <Text style={styles.textLink}>A propos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.lienNav2}
                                    onPress={() => props.navigation.navigate('Map')}>
                                    <MaterialCommunityIcons name="map" color={COLORS.mauveClaire} size={30} />
                                    <Text style={styles.textLink}>Map</Text>
                                </TouchableOpacity>
                            </View>
                            {/* fin container des liens de navigation*/}
                        </View>
                    </LinearGradient>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    // style du menu format portrait
    containerMenu: {
        flexDirection: 'column',
        padding: 15,
    },
    containerUserIcon: {
        flexDirection: 'row',
    },
    contenair: {},
    userIcon: {
        width: 60,
        height: 60,
    },
    nameUser: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
        marginLeft: 15,
    },
    lienVersProfil: {
        color: 'white',
        marginLeft: 15,
    },
    containerLink: {
        marginTop: 10,
    },
    lienNav: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        height: 55,
        width: 200,
        marginTop: 20,
    },
    textLink: {
        marginLeft: 10,
        color: COLORS.mauveClaire,
        fontSize: 18,
        fontWeight: 'bold',
    },
    containerLinkDeconnexion: {
        flexDirection: 'row',
        alignItems: 'center',
        left: 80,
        marginTop: 30,
    },
    textDeconnexion: {
        color: 'white',
    },

    // style du menu paysage
    containerMenu2: {
        flexDirection: 'row',
    },
    containerLink2: {
        flex: 1,
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    lienNav2: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        marginHorizontal: 5,
        height: 55,
        width: 200,
        marginTop: 20,
    },
    leftContain: {
        display: 'flex',
        flexDirection: 'column',
    },
    containerUserIcon2: {
        flex: 4,
    },
    userIcon2: {
        width: 60,
        height: 60,
        marginLeft: 10,
    },
    containerLinkDeconnexion2: {
        flex: 1,
        paddingHorizontal: 10,
    },
});

export default NavBar;
