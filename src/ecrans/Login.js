/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import {View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../asset/constantes/Couleurs';
import auth from '@react-native-firebase/auth';
import RNGoogleRecaptcha from 'react-native-google-recaptcha';

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkValidEmail, setCheckValidEmail] = useState(false);

    // Fonction pour tester et valider le formulaire
    const recaptchaRef = useRef(null);
    const verify = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email) {
            alert('Veuillez entrer une adresse e-mail.');
        } else if (!password) {
            alert('Veuillez entrer votre mot de passe.');
        } else if (email && password && reg.test(email)) {
            setCheckValidEmail(false);
            recaptchaRef.current.open();
        } else {
            setCheckValidEmail(true);
            Alert.alert('Erreur', "L'adresse mail n'est pas valide", [
                {
                    text: 'OK',
                },
            ]);
        }
    };

    // Fonction de vérification de firebase puis du captchat
    const OnLoginPress = () => {
        console.log('Tentative de connection');
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const uid = response.user.uid;
                console.log('Utilisateur connecté, son identifiant : ', uid, 'Nom:', auth().currentUser.displayName);
                props.navigation.navigate('Home');
            })
            .catch(error => {
                if (error.code === 'auth/user-disabled') {
                    console.log('Cette adresse et/ou le mot de passe est/sont erronné/s');
                    alert('Cette adresse et/ou le mot de passe est/sont erronné/s');
                }
                if (error.code === 'auth/invalid-email') {
                    console.log('Cette adresse et/ou le mot de passe est/sont erronné/s');
                    alert('Cette adresse et/ou le mot de passe est/sont erronné/s');
                }
                if (error.code === 'auth/user-not-found') {
                    console.log('Cette adresse et/ou le mot de passe est/sont erronné/s');
                    alert('Cette adresse et/ou le mot de passe est/sont erronné/s');
                }
                if (error.code === 'auth/wrong-password') {
                    console.log('Cette adresse et/ou le mot de passe est/sont erronné/s');
                    alert('Cette adresse et/ou le mot de passe est/sont erronné/s');
                }
                if (error.code === 'auth/too-many-requests') {
                    console.log(
                        "L'accès au compte a été bloqué temporairement suite à une activité inhabituelle. Veuillez réessayer plus tard.",
                    );
                    alert(
                        "L'accès au compte a été bloqué temporairement suite à une activité inhabituelle. Veuillez réessayer plus tard.",
                    );
                }
            });
    };

    //fonction pour verifié si un utilisateur est deja connecter
    const _isUserAuthenticated = () => {
        if (auth().currentUser) {
            console.log('User allready connected, this id:', auth().currentUser.uid);
            props.navigation.navigate('Home', {id: 1});
        } else {
            console.log('User is not logged');
        }
    };

    useEffect(() => {
        _isUserAuthenticated();
    }, []);

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.logoContainer}>
                <Image source={require('../asset/img/logo.jpg')} style={styles.logo} />
                <Text style={styles.title}>Connection</Text>
            </View>

            {/* zone de saisie */}
            <View style={styles.inputContainer}>
                <Entypo name="email" size={20} color="#666" style={styles.marginRight} />
                <TextInput
                    style={styles.input}
                    placeholder={'Entrer votre email'}
                    onChangeText={text => setEmail(text)}
                />
                {checkValidEmail ? <Text style={styles.errorInput}>L'email n'est pas valide</Text> : ''}
            </View>
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="security" size={20} color="#666" style={styles.marginRight} />
                <TextInput
                    style={styles.input}
                    placeholder={'Entrer votre mot de passe'}
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                />
                {/* <TouchableOpacity>
                    <Text>Oublié ?</Text>
                </TouchableOpacity> */}
            </View>

            {/* Button Action */}
            <TouchableOpacity style={styles.touchablebutton} onPress={verify}>
                <Text style={styles.touchableText}>Se Connecter</Text>
            </TouchableOpacity>
            <RNGoogleRecaptcha
                ref={recaptchaRef}
                siteKey={'6LcHJqApAAAAAJM--M7PlMe663YUMk_f-uXFs7s5'}
                baseUrl={'https://pixelevent.site'}
                lang="fr"
                onVerify={OnLoginPress}
            />
            {/* <View>
                <Text style={styles.textCenter}>Me connecter avec</Text>
            </View>
            <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons name="facebook" size={35} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons name="instagram" size={35} color="#E829DE" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons name="youtube" size={35} color="red" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons name="snapchat" size={35} color="yellow" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons name="twitter" size={35} color="#1e90ff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons name="linkedin" size={35} color="blue" />
                </TouchableOpacity>
            </View> */}
            <View style={styles.containerAlternative}>
                <Text style={styles.textAlign}>Nouveau ? </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
                    <Text style={styles.textAlternative}>Crée un compte</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        backgroundColor: 'white',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    logo: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 30,
    },
    marginRight: {
        marginRight: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 25,
    },
    input: {
        flex: 1,
    },
    touchablebutton: {
        marginBottom: 30,
        borderRadius: 5,
        padding: 20,
        backgroundColor: COLORS.mauveClaire,
    },
    touchableText: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18,
        color: 'white',
    },
    textCenter: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    icon: {
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    containerAlternative: {
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAlign: {
        textAlign: 'center',
    },
    textAlternative: {
        textAlign: 'center',
        color: COLORS.mauveClaire,
    },
    errorInput: {
        marginHorizontal: 15,
        marginBottom: 0,
        color: 'red',
    },
});
export default Login;
