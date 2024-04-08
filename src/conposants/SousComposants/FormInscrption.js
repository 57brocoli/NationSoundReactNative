import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../asset/constantes/Couleurs';

export const ChampName = ({name, setName, nameEmpty}) => {
    const colors = nameEmpty === false && 'red';
    const [valide, setValid] = useState(true);
    const handleChangename = inputText => {
        setName(inputText);
        setValid(inputText.length >= 0);
    };
    return (
        <View style={styles.inputContainer}>
            <Entypo name="account" size={20} color="#666" style={styles.marginRight} />
            <TextInput
                value={name}
                style={[styles.input, valide && styles.inputValide]}
                placeholderTextColor={colors}
                placeholder={'Entrez votre Nom'}
                onChangeText={handleChangename}
            />
            <Text>*</Text>
        </View>
    );
};
export const ChampPhone = ({phoneNumber, setPhoneNumber}) => {
    return (
        <View style={styles.inputContainer}>
            <Entypo name="phone" size={20} color="#666" style={styles.marginRight} />
            <TextInput
                value={phoneNumber}
                style={styles.input}
                keyboardType="numeric"
                placeholder={'Entrez votre numero de téléphone'}
                onChangeText={text => setPhoneNumber(text)}
            />
        </View>
    );
};

export const ChampEmail = ({email, setEmail, emailEmpty, emailValide}) => {
    const colors = emailEmpty === false && 'red';
    const [emailIsValid, setEmailIsValid] = useState(true);
    const handleChangeEmail = inputText => {
        setEmail(inputText);
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setEmailIsValid(reg.test(email));
    };
    return (
        <View style={styles.inputContainer}>
            <Entypo name="email" size={20} color="#666" style={styles.marginRight} />
            <TextInput
                value={email}
                style={[styles.input, emailIsValid ? styles.inputValide : emailValide === false && styles.inputEnexact]}
                placeholderTextColor={colors}
                placeholder={'Entrez votre email'}
                onChangeText={handleChangeEmail}
                inputMode={email}
                keyboardType="email-address"
            />
            <Text>*</Text>
        </View>
    );
};

export const ChampPassword = ({setPassword, password, passwordEmpty, passwordValide}) => {
    const colors = passwordEmpty === false && 'red';
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const handleChangePassword = inputText => {
        setPassword(inputText);
        const regP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/;
        setIsPasswordValid(regP.test(inputText));
    };
    const showPasswordValidity = () => {
        Alert.alert('Validité', validators.join('\n'), [{text: 'OK'}], {cancelable: true});
    };
    const validators = [
        'Le mot de pase doit contenir au moins :',
        '- une lettre minuscule',
        '- une lettre majuscule',
        '- un chiffre',
        '- un caractère spécial parmi ".@$!%*?&"',
        '- faire au minimum 8 caractères',
    ];

    return (
        <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock" size={20} color="#666" style={styles.marginRight} />
            <TextInput
                value={password}
                // style={[styles.input, isPasswordValid && styles.inputValide]}
                style={[
                    styles.input,
                    isPasswordValid ? styles.inputValide : passwordValide === false && styles.inputEnexact,
                ]}
                placeholder={'Entrer votre mot de passe'}
                placeholderTextColor={colors}
                onChangeText={handleChangePassword}
                secureTextEntry
            />
            <TouchableOpacity onPress={showPasswordValidity}>
                <MaterialCommunityIcons name="help" size={20} color="#666" style={styles.marginRight} />
            </TouchableOpacity>
            <Text>*</Text>
        </View>
    );
};

export const ChampPasswordSecurity = ({password, passwordSecurity, setPasswordSecurity, passwordSecurityEmpty}) => {
    const colors = passwordSecurityEmpty === false && 'red';
    const [passwordSame, setPasswordSame] = useState(true);
    const verifySamePassword = inputText => {
        setPasswordSecurity(inputText);
        setPasswordSame(password === inputText);
    };
    return (
        <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock" size={20} color="#666" style={styles.marginRight} />
            <TextInput
                value={passwordSecurity}
                // style={[styles.input, passwordSame && styles.inputValide]}
                style={[styles.input, passwordSame ? styles.inputValide : styles.inputEnexact]}
                placeholderTextColor={colors}
                placeholder={'Confirmer votre mot de passe'}
                onChangeText={verifySamePassword}
                secureTextEntry
            />
            <Text>*</Text>
        </View>
    );
};

const styles = StyleSheet.create({
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
        color: '#666',
    },
    inputEmpty: {
        flex: 1,
        color: 'red',
    },
    inputEnexact: {
        flex: 1,
        color: 'red',
    },
    inputValide: {
        flex: 1,
        color: COLORS.vert,
    },
    marginRight: {
        marginRight: 5,
    },
});
