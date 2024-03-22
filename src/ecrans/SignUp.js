/* eslint-disable radix */
/* eslint-disable no-alert */
import {View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../asset/constantes/Couleurs';
import auth from '@react-native-firebase/auth';
import bcrypt from 'bcryptjs';
import RNGoogleRecaptcha from 'react-native-google-recaptcha';

const SignUp = props => {
    // variable des données de l'utilisateur
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecurity, setPasswordSecurity] = useState('');
    const date = new Date();

    // fonction pour lancer le captchat
    const recaptchaRef = useRef(null);
    const verify = () => {
        if (!name) {
            alert("Ooh! Il s'emblerait que vous avez oublier votre nom");
        } else if (!email) {
            alert('Adresse mail manquante');
        } else if (!password) {
            alert('Veuillez entrez un mot de passe');
        } else if (!passwordSecurity) {
            alert('Veuillez confirmer votre mot de passe');
        } else if (password !== passwordSecurity) {
            alert("Il s'emblerait que la confirmation du mot de passe est incorect");
        } else {
            recaptchaRef.current.open();
        }
    };

    // fonction pour s'inscrire sur firebase et envoyer les données dans la database liveevent
    const onSingUp = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async response => {
                await response.user.updateProfile({
                    displayName: name,
                });
                props.navigation.navigate('Home', {id: 1});
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Cette adresse possède déja un compte');
                }
                if (error.code === 'auth/invalid-email') {
                    alert('Adresse mail invalide');
                }
                if (error.code === 'auth/weak-password') {
                    alert('Mot de passe pas assez sécurisant');
                }
                console.error(error);
            });

        const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u');

        fetch('https://pixelevent.site/api/mobile_users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: hashedPassword,
                phone: parseInt(phoneNumber),
                createdAt: date,
            }),
        });
    };

    return (
        <ScrollView>
            <SafeAreaView style={styles.root}>
                <View style={styles.logoContainer}>
                    <Image source={require('../asset/img/logo.jpg')} style={styles.logo} />
                    <Text style={styles.title}>Inscrition</Text>
                </View>

                {/* zone de saisie */}
                <View style={styles.inputContainer}>
                    <Entypo name="account" size={20} color="#666" style={styles.marginRight} />
                    <TextInput
                        style={styles.input}
                        placeholder={'Entrer votre Nom'}
                        onChangeText={text => setName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Entypo name="phone" size={20} color="#666" style={styles.marginRight} />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder={'Entrer votre numero de téléphone'}
                        onChangeText={text => setPhoneNumber(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Entypo name="email" size={20} color="#666" style={styles.marginRight} />
                    <TextInput
                        style={styles.input}
                        placeholder={'Entrer votre email'}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="lock" size={20} color="#666" style={styles.marginRight} />
                    <TextInput
                        style={styles.input}
                        placeholder={'Entrer votre mot de passe'}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                </View>
                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="lock" size={20} color="#666" style={styles.marginRight} />
                    <TextInput
                        style={styles.input}
                        placeholder={'Confirmer votre mot de passe'}
                        onChangeText={text => setPasswordSecurity(text)}
                        secureTextEntry
                    />
                </View>

                {/* Button Action */}
                <TouchableOpacity style={styles.touchablebutton} onPress={verify}>
                    <Text style={styles.touchableText}>S'inscrire</Text>
                </TouchableOpacity>

                <RNGoogleRecaptcha
                    ref={recaptchaRef}
                    siteKey={'6LcHJqApAAAAAJM--M7PlMe663YUMk_f-uXFs7s5'}
                    baseUrl={'https://pixelevent.site'}
                    lang="fr"
                    onVerify={onSingUp}
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
                <View style={styles.box}>
                    <Text style={styles.textAlign}>Déja un compte ? </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('LogIn')}>
                        <Text style={styles.textAlign2}>Me connecter</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        paddingHorizontal: 25,
        backgroundColor: 'white',
    },
    logo: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 30,
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
    marginRight: {
        marginRight: 5,
    },
    box: {
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAlign1: {
        textAlign: 'center',
    },
    textAlign2: {
        textAlign: 'center',
        color: COLORS.mauveClaire,
    },
});
export default SignUp;
