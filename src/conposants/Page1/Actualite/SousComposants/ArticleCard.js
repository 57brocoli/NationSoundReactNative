import {View, Text, ActivityIndicator, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../asset/constantes/Couleurs';

const ArticleCard = ({articleRevers, article, props}) => {
    //Chemin d'acces à l'image
    const image = {
        uri: 'https://pixelevent.site/assets/uploads/articles/',
    };
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                props.navigation.navigate('Page2', {
                    article: article,
                })
            }>
            {/* Image à gauche */}
            {!articleRevers ? (
                <ActivityIndicator size="large" color="#00ff00" />
            ) : (
                <Image
                    style={styles.cardImg}
                    source={{
                        uri: `${image.uri}${article.featuredImage}`,
                    }}
                />
            )}
            {/* Text à droite */}
            <View style={styles.cardContainerText}>
                <Text style={styles.cardTitle}>{article.title}</Text>
                <Text style={styles.into}>{article.introduction}</Text>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.mauveFonce,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
    },
    cardImg: {
        width: 120,
        height: 130,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    cardContainerText: {
        padding: 10,
        flex: 1,
    },
    cardTitle: {
        color: COLORS.jaune,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    into: {
        color: 'white',
        overflow: 'hidden',
        textAlign: 'justify',
        height: 85,
    },
});
export default ArticleCard;
