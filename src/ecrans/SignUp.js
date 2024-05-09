/* eslint-disable radix */
/* eslint-disable no-alert */
import {View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ScrollView, Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLORS} from '../asset/constantes/Couleurs';
import auth from '@react-native-firebase/auth';
import bcrypt from 'bcryptjs';
import RNGoogleRecaptcha, {GoogleRecaptchaSize} from 'react-native-google-recaptcha';
import {
    ChampEmail,
    ChampName,
    ChampPassword,
    ChampPasswordSecurity,
    ChampPhone,
} from '../Conposants/SousComposants/FormInscrption';

const SignUp = props => {
    // variable des données de l'utilisateur
    const [name, setName] = useState('');
    const [nameEmpty, setNameEmpty] = useState('');

    const [phoneNumber, setPhoneNumber] = useState();

    const [email, setEmail] = useState('');
    const [emailEmpty, setEmailEmpty] = useState('');
    const [emailValide, setEmailValide] = useState('');

    const [password, setPassword] = useState('');
    const [passwordEmpty, setPasswordEmpty] = useState('');
    const [passwordValide, setPasswordValide] = useState('');

    const [passwordSecurity, setPasswordSecurity] = useState('');
    const [passwordSecurityEmpty, setPasswordSecurityEmpty] = useState('');

    const date = new Date();

    const showAlertEmpty = () => {
        Alert.alert('Attention', 'Certains champs sont vides', [{text: 'OK'}], {cancelable: true});
    };
    const showAlertEmailNotValide = () => {
        Alert.alert('Attention', 'Email incorect', [{text: 'OK'}], {cancelable: true});
    };
    const showAlertPasswordInvalide = () => {
        Alert.alert('Attention', 'Mot de passe invalide', [{text: 'OK'}], {cancelable: true});
    };
    const showAlertPasswordNotSame = () => {
        Alert.alert('Attention', 'La confirmation du mot de passe est incorrect', [{text: 'OK'}], {cancelable: true});
    };

    // fonction pour lancer le captchat
    const recaptchaRef = useRef(null);
    const verify = () => {
        name ? setNameEmpty(true) : setNameEmpty(false);
        email ? setEmailEmpty(true) : setEmailEmpty(false);
        password ? setPasswordEmpty(true) : setPasswordEmpty(false);
        passwordSecurity ? setPasswordSecurityEmpty(true) : setPasswordSecurityEmpty(false);
        if (!name || !email || !password || !passwordSecurity) {
            showAlertEmpty();
        } else if (name && email && password && passwordSecurity) {
            validity();
        }
    };
    const validity = async () => {
        setEmailEmpty(false);
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email)) {
            setEmailValide(true);
            const regP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/;
            if (regP.test(password)) {
                setPasswordValide(true);
                if (password !== passwordSecurity) {
                    setPasswordSecurityEmpty(true);
                    // setPasswordSame(false);
                    showAlertPasswordNotSame();
                } else {
                    // setPasswordSame(true);
                    try {
                        const token = await recaptchaRef.current.getToken();
                        console.log('Recaptcha Token:', token);
                    } catch (e) {
                        console.error('Recaptcha Error:', e);
                    }
                }
            } else {
                showAlertPasswordInvalide();
                setPasswordValide(false);
            }
        } else {
            setEmailValide(false);
            showAlertEmailNotValide();
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
                    <Text style={styles.title}>Inscription</Text>
                </View>

                {nameEmpty ? (
                    <ChampName name={name} setName={setName} />
                ) : (
                    <ChampName name={name} setName={setName} nameEmpty={nameEmpty} />
                )}
                <ChampPhone phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />

                {emailValide ? (
                    <ChampEmail email={email} setEmail={setEmail} emailEmpty={emailEmpty} emailValide={emailValide} />
                ) : emailEmpty ? (
                    <ChampEmail email={email} setEmail={setEmail} emailEmpty={emailEmpty} emailValide={emailValide} />
                ) : (
                    <ChampEmail email={email} setEmail={setEmail} emailEmpty={emailEmpty} emailValide={emailValide} />
                )}

                {passwordValide ? (
                    <ChampPassword setPassword={setPassword} password={password} passwordValide={passwordValide} />
                ) : passwordEmpty ? (
                    <ChampPassword setPassword={setPassword} password={password} passwordValide={passwordValide} />
                ) : (
                    <ChampPassword
                        setPassword={setPassword}
                        password={password}
                        passwordEmpty={passwordEmpty}
                        passwordValide={passwordValide}
                    />
                )}

                {passwordSecurityEmpty ? (
                    <ChampPasswordSecurity
                        passwordSecurity={passwordSecurity}
                        setPasswordSecurity={setPasswordSecurity}
                        password={password}
                    />
                ) : (
                    <ChampPasswordSecurity
                        passwordSecurity={passwordSecurity}
                        setPasswordSecurity={setPasswordSecurity}
                        password={password}
                        passwordSecurityEmpty={passwordSecurityEmpty}
                    />
                )}

                <Text style={styles.oblig}>* champ obligatoire</Text>

                {/* Button Action */}
                <TouchableOpacity style={styles.touchablebutton} onPress={verify}>
                    <Text style={styles.touchableText}>S'inscrire</Text>
                </TouchableOpacity>

                <RNGoogleRecaptcha
                    ref={recaptchaRef}
                    size={GoogleRecaptchaSize.INVISIBLE}
                    siteKey={'6LeR8MYpAAAAAHqT4Y3Fwvb6MR3a63V9PZOZX9ti'}
                    baseUrl={'https://pixelevent.site'}
                    lang="fr"
                    onVerify={onSingUp}
                />
                <View style={styles.box}>
                    <Text>Déja un compte ? </Text>
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

    oblig: {
        marginBottom: 20,
        marginTop: -15,
    },
    touchablebutton: {
        marginBottom: 25,
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
    box: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAlign2: {
        textAlign: 'center',
        color: COLORS.mauveClaire,
    },
});
export default SignUp;
