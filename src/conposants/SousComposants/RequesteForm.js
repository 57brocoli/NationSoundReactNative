import {
    View,
    Text,
    Alert,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Button,
    TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {PARAGRAPH} from '../../asset/constantes/Constantes';

const RequesteForm = () => {
    //Variable du formulaire de requete
    const [firstname, setFirstname] = useState();
    const [checkFirstname, setCheckFirstname] = useState(true);
    const [lastname, setLastname] = useState();
    const [checkLastname, setCheckLastname] = useState(true);
    const [email, setEmail] = useState();
    const [checkEmail, setCheckEmail] = useState(true);
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const [motif, setMotif] = useState();
    const [checkMotif, setCheckMotif] = useState(true);
    const [content, setContent] = useState();
    const [checkContent, setCheckContent] = useState(true);
    const date = new Date();
    // Fonction pour envoyer la requete
    const sendRequete = () => {
        formIsNotEmpty();
        formIsValide();
    };
    const formIsNotEmpty = () => {
        if (!firstname || !lastname || !motif || !email || !content) {
            if (!firstname) {
                setCheckFirstname(false);
            } else {
                setCheckFirstname(true);
            }
            if (!lastname) {
                setCheckLastname(false);
            } else {
                setCheckLastname(true);
            }
            if (!email) {
                setCheckEmail(false);
            } else {
                setCheckEmail(true);
            }
            if (!motif) {
                setCheckMotif(false);
            } else {
                setCheckMotif(true);
            }
            if (!content) {
                setCheckContent(false);
            } else {
                setCheckContent(true);
            }
            Alert.alert(
                'Erreur',
                "Oups, il s'emblerait qu'un ou plusieurs champs sont vide",
                [
                    {
                        text: 'OK',
                    },
                ],
            );
        }
    };
    const formIsValide = () => {
        if (firstname && lastname && email && motif && content) {
            if (firstname) {
                setCheckFirstname(true);
            }
            if (lastname) {
                setCheckLastname(true);
            }
            if (email) {
                setCheckEmail(true);
            }
            if (motif) {
                setCheckMotif(true);
            }
            if (content) {
                setCheckContent(true);
            }
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(email)) {
                setCheckValidEmail(false);
                send();
            } else {
                setCheckValidEmail(true);
                Alert.alert('Erreur', "L'adresse mail n'est pas valide", [
                    {
                        text: 'OK',
                    },
                ]);
            }
        }
    };
    const send = async () => {
        await fetch('https://pixelevent.site/api/requests', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                motif: motif,
                content: content,
                statut: false,
                ouvert: false,
                createdAt: date,
            }),
        });
        setFirstname('');
        setLastname('');
        setEmail('');
        setMotif('');
        setContent('');
        Alert.alert(
            'Message envoyé',
            'Votre message a été envoyée, elle serat traiter dans les plus bref delais. Vous recevrez une réponse dans le mail comuniquer dans le message',
            [
                {
                    text: 'OK',
                },
            ],
        );
    };
    return (
        <View>
            <Text style={PARAGRAPH}>Envoyer nous un mail :</Text>
            <SafeAreaView style={styles.RequetContainer}>
                <View style={styles.RequetContainerName}>
                    <View>
                        <TextInput
                            style={styles.inputFlex}
                            onChangeText={setFirstname}
                            value={firstname}
                            placeholder="Nom"
                        />
                        {!checkFirstname ? (
                            <Text style={styles.errorInput}>
                                Chant manquant
                            </Text>
                        ) : (
                            ''
                        )}
                    </View>
                    <View>
                        <TextInput
                            style={styles.inputFlex}
                            onChangeText={setLastname}
                            value={lastname}
                            placeholder="Prenom"
                        />
                        {!checkLastname ? (
                            <Text style={styles.errorInput}>
                                Chant manquant
                            </Text>
                        ) : (
                            ''
                        )}
                    </View>
                </View>

                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    inputMode={email}
                    keyboardType="email-address"
                    placeholder="Email"
                />
                {!checkEmail ? (
                    <Text style={styles.errorInput}>Chant manquant</Text>
                ) : (
                    ''
                )}
                {checkValidEmail ? (
                    <Text style={styles.errorInput}>
                        L'email n'est pas valide
                    </Text>
                ) : (
                    ''
                )}
                <TextInput
                    style={styles.input}
                    onChangeText={setMotif}
                    value={motif}
                    maxLength={255}
                    placeholder="Motif"
                />
                {!checkMotif ? (
                    <Text style={styles.errorInput}>Chant manquant</Text>
                ) : (
                    ''
                )}
                <TextInput
                    style={styles.inputTextArea}
                    onChangeText={setContent}
                    value={content}
                    placeholder="Requête"
                />
                {!checkContent ? (
                    <Text style={styles.errorInput}>Chant manquant</Text>
                ) : (
                    ''
                )}
                <View style={styles.submit}>
                    <Button title="Submit" onPress={() => sendRequete()} />
                </View>
            </SafeAreaView>
        </View>
    );
};
const widthScreen = Dimensions.get('window').width;
const styles = StyleSheet.create({
    input: {
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    inputFlex: {
        height: 40,
        width: widthScreen / 2 - 38,
        marginEnd: 15,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    inputTextArea: {
        height: 80,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        textAlignVertical: 'top',
    },
    RequetContainer: {
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    RequetContainerName: {
        flexDirection: 'row',
        // justifyContent: 'center',
    },
    submit: {
        marginVertical: 10,
    },
    errorInput: {
        marginHorizontal: 15,
        marginBottom: 10,
        color: 'red',
    },
    contact: {
        margin: 15,
    },
});
export default RequesteForm;
