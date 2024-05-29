import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {FONTS} from '../../../asset/constantes/Fonts';

const Faq = ({faq}) => {
    const [question, setQuestion] = useState(false);
    const showReponse = () => {
        setQuestion(!question);
    };
    return (
        <View style={styles.marginVertical}>
            <TouchableOpacity onPress={() => showReponse()} style={styles.containerQuestion}>
                <Text style={styles.question}>{faq.question}</Text>
            </TouchableOpacity>
            <View style={question ? styles.reponseShow : styles.reponseHide}>
                <Text>{faq.answer}</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    // Style FAQ
    marginVertical: {
        marginVertical: 5,
    },
    containerFAQ: {
        marginHorizontal: 15,
        marginBottom: 25,
    },
    containerQuestion: {
        height: 50,
        zIndex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margintop: 10,
    },
    question: {
        color: 'black',
        fontFamily: FONTS.titre,
    },
    reponseShow: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginHorizontal: 5,
        borderWidth: 0.5,
        color: 'black',
        paddingTop: 0,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    reponseHide: {
        top: -50,
        display: 'none',
    },
});
export default Faq;
