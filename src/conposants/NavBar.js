/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Animated} from 'react-native';
import React, {useState, useRef} from 'react';
import {STYLESHEADER} from '../asset/constantes/StylesHeader';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {STYLESMENU} from '../asset/constantes/StyleMenu';
import {COLORS} from '../asset/constantes/Couleurs';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

const NavBar = ({props}) => {
    //Variable pour afficher/masquer le menu
    const [showMenu, setShowMenu] = useState(false);
    const slideMenu = useRef(new Animated.Value(260)).current;
    const scralView = useRef(new Animated.Value(1)).current;
    const filtre = useRef(new Animated.Value(1)).current;

    const onSingOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
                props.navigation.navigate('LogIn');
            });
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
                    <MaterialCommunityIcons name={showMenu ? 'close' : 'menu'} color={'white'} size={50} />
                </TouchableOpacity>
            </View>
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
                            <Image source={require('../asset/img/userIcon.png')} style={STYLESMENU.userIcon} />
                            <View style={STYLESMENU.contenair}>
                                {/* container du nom de l'utilisateur */}
                                <Text style={STYLESMENU.nameUser}>{auth().currentUser.displayName}</Text>
                                <Text style={STYLESMENU.lienVersProfil}>Voir Profile</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={STYLESMENU.containerLink}>
                            <TouchableOpacity
                                style={STYLESMENU.lienNav}
                                onPress={() => props.navigation.navigate('Accueil1')}>
                                <MaterialCommunityIcons name="home" color={COLORS.mauveClaire} size={30} />
                                <Text style={STYLESMENU.textLink}>Accueil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={STYLESMENU.lienNav}
                                onPress={() =>
                                    props.navigation.navigate('Page1', {
                                        pageBilletterie: 'ok',
                                    })
                                }>
                                <MaterialCommunityIcons name="ticket" color={COLORS.mauveClaire} size={30} />
                                <Text style={STYLESMENU.textLink}>Billetterie</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={STYLESMENU.lienNav}
                                onPress={() =>
                                    props.navigation.navigate('Page1', {
                                        pageProgramme: 'ok',
                                    })
                                }>
                                <MaterialCommunityIcons name="clipboard-list" color={COLORS.mauveClaire} size={30} />
                                <Text style={STYLESMENU.textLink}>Programme</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={STYLESMENU.lienNav}
                                onPress={() =>
                                    props.navigation.navigate('Page1', {
                                        pageInformation: 'ok',
                                    })
                                }>
                                <MaterialCommunityIcons name="information" color={COLORS.mauveClaire} size={30} />
                                <Text style={STYLESMENU.textLink}>Information</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={STYLESMENU.lienNav}
                                onPress={() =>
                                    props.navigation.navigate('Page1', {
                                        pageApropos: 'ok',
                                    })
                                }>
                                <MaterialCommunityIcons name="balloon" color={COLORS.mauveClaire} size={30} />
                                <Text style={STYLESMENU.textLink}>A propos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={STYLESMENU.lienNav}
                                onPress={() => props.navigation.navigate('Map')}>
                                <MaterialCommunityIcons name="map" color={COLORS.mauveClaire} size={30} />
                                <Text style={STYLESMENU.textLink}>Map</Text>
                            </TouchableOpacity>
                        </View>
                        {/* fin container des liens de navigation*/}

                        {/*container se deconnecter*/}
                        <TouchableOpacity style={STYLESMENU.containerLinkDeconnexion} onPress={() => onSingOut()}>
                            <MaterialCommunityIcons name="logout" color={'white'} size={30} />
                            <Text style={STYLESMENU.textDeconnexion}>Déconnexion</Text>
                        </TouchableOpacity>
                        {/*container se deconnecter*/}
                    </View>
                </LinearGradient>
            </Animated.View>
        </View>
    );
};

export default NavBar;
