import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator, TextInput, Pressable, Dimensions} from 'react-native';
//import des variables de style prédéfinis
import {CENTER, TITLE} from '../../asset/constantes/Constantes';
import {COLORS} from '../../asset/constantes/Couleurs';
import {FlatList} from 'react-native';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

const ArticleDetails = ({props, article}) => {
    //Variable pour recupérer les commentaires
    useEffect(() => {
        axios.get('https://pixelevent.site/api/comments').then(res => setComments(res.data['hydra:member']));
    }, []);
    const [comments, setComments] = useState([]);

    // Variable du nouveau commentaire
    const [commentaire, setCommentaire] = useState('');

    //Variable qui contient le nom de l'utilisateur actuel
    const user = auth().currentUser.displayName;

    // Fonction pour envoyer le commentaire
    const sendComment = async () => {
        await fetch('https://pixelevent.site/api/comments', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                content: commentaire,
                authorMobile: user,
                relatedArticle: '/api/articles/' + article.id,
                created_at: 'CURRENT_TIMESTAMP',
                createdAt: '2023-10-23T11:34:24.704Z',
            }),
        });
        setCommentaire('');
        axios.get('https://pixelevent.site/api/comments').then(res => setComments(res.data['hydra:member']));
    };

    return (
        <View>
            <Image
                style={styles.img}
                source={{
                    uri: `https://pixelevent.site/assets/uploads/articles/${article.featuredImage}`,
                }}
            />
            <View style={CENTER}>
                <Text style={TITLE}>{article.title}</Text>
            </View>
            <View style={CENTER}>
                <Text style={styles.content}>{article.introduction}</Text>
            </View>
            <View style={CENTER}>
                <Text style={styles.content}>{article.content}</Text>
            </View>
            <FlatList
                horizontal={true}
                data={article.images}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return (
                        <Image
                            style={styles.carrousel}
                            source={{
                                uri: `https://pixelevent.site/assets/uploads/articles/diapo/${item.name}`,
                            }}
                        />
                    );
                }}
            />

            {/* Section commentaires */}
            <View style={styles.sectionCommentaires}>
                <View style={CENTER}>
                    <Text style={TITLE}>Commentaires</Text>
                </View>
                {comments ? (
                    comments
                        .filter(function (item) {
                            return item.relatedArticle.id === article.id;
                        })
                        .map((comment, index) => {
                            return (
                                <View key={index}>
                                    {comment.author === undefined ? (
                                        ''
                                    ) : (
                                        <Text style={styles.sectionCommentairesAuthor}>
                                            {comment.author.firstname} {comment.author.lastname}
                                        </Text>
                                    )}
                                    {comment.authorMobile === undefined ? (
                                        ''
                                    ) : (
                                        <Text style={styles.sectionCommentairesAuthor}>{comment.authorMobile}</Text>
                                    )}
                                    <Text style={styles.sectionCommentairesContent}>{comment.content}</Text>
                                </View>
                            );
                        })
                ) : (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                )}
                <View style={styles.sectionNewCommentaire}>
                    <Text>Nouveau commentaire</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setCommentaire(text)}
                        value={commentaire}
                        placeholder="Commentaire"
                    />
                    {commentaire ? (
                        <Pressable onPress={sendComment} style={styles.envoyer}>
                            <Text style={styles.envoyerText}>Envoyer</Text>
                        </Pressable>
                    ) : (
                        ''
                    )}
                </View>
            </View>
        </View>
    );
};
const ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    carrousel: {
        width: ScreenWidth - 60,
        height: 200,
    },
    img: {
        height: 450,
        width: '105%',
        marginTop: 45,
        right: 20,
        marginBottom: 20,
    },
    title: {
        color: COLORS.orange,
    },
    content: {
        color: 'white',
        textAlign: 'justify',
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    // style pour les commentaires
    sectionCommentaires: {
        padding: 15,
    },
    sectionCommentairesTitle: {
        // fontSize: 16,
        // fontWeight: 'bold',
        textAlign: 'center',
        // color: COLORS.orange,
        margin: 10,
    },
    sectionCommentairesAuthor: {
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    sectionCommentairesContent: {
        color: 'black',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 5,
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    // Section nouveau commentaire
    sectionNewCommentaire: {
        marginTop: 20,
        marginHorizontal: 10,
    },
    input: {
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginTop: 5,
    },
    envoyer: {
        backgroundColor: COLORS.mauveClaire,
        width: 70,
        padding: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    envoyerText: {
        color: 'white',
        textAlign: 'center',
    },
});
export default ArticleDetails;
