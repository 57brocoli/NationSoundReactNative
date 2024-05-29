import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
//import des variables de style prédéfinis
import {CENTER, TITLE} from '../../../asset/constantes/Constantes';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../SousComposants/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {fetchArticle, fetchFaq, fetchHeader} from '../../../../redux/reducers/sectionContenuReducer';
import HeaderPage from '../HeaderPage';
import Faq from './Faq';
import Filtre from './SousComposants/Filtre';
import ArticleCard from './SousComposants/ArticleCard';

const Actualite = ({props}) => {
    //Importation du reducer
    const dispatch = useDispatch();
    const articles = useSelector(state => state.articles.articles[0]);
    const faqs = useSelector(state => state.faq.faq[0]);
    const views = useSelector(state => state.views.views);
    useEffect(() => {
        dispatch(fetchArticle());
        dispatch(fetchFaq());
        dispatch(fetchHeader());
    }, [dispatch]);
    //Si l'on a nos articles:
    if (articles) {
        //On inverse l'odre des articles du tableau pour avoir le dernier publié en avant.
        var articleRevers = [...articles].reverse();
        //On récupère toutes les catégories
        const allMapCategories = articleRevers.map(article => article.categories.name);
        //Et on elemine les doublons
        var categories = allMapCategories.filter((x, i) => allMapCategories.indexOf(x) === i);
    }
    //On récupère les données de la page actualité
    if (views) {
        var info = views.find(x => x.name === 'actualite');
    }

    //Fonctions pour filtrées les articles
    const [nombreArticle, setNombreArticle] = useState(3);
    const tousAfficher = () => {
        setNombreArticle(articles.length);
    };
    const revenir = () => {
        setNombreArticle(3);
    };
    const [catFiltre, setCatFiltre] = useState(null);

    return (
        <>
            <HeaderPage data={info} />
            <View style={styles.containerInfos}>
                {articleRevers ? (
                    <View>
                        <View style={CENTER}>
                            <Text style={TITLE}>Actualités</Text>
                        </View>
                        <View style={styles.filtreContainer}>
                            {nombreArticle !== 3 ? (
                                <TouchableOpacity onPress={() => revenir()} style={styles.filtre}>
                                    <Text style={styles.colorBlack}>Revenir</Text>
                                    <MaterialCommunityIcons name="chevron-up" color={'black'} size={25} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => tousAfficher()} style={styles.filtre}>
                                    <Text style={styles.colorBlack}>Tout afficher</Text>
                                    <MaterialCommunityIcons name="chevron-down" color={'black'} size={25} />
                                </TouchableOpacity>
                            )}
                            <Filtre categories={categories} setCatFiltre={setCatFiltre} catFiltre={catFiltre} />
                        </View>
                        {catFiltre
                            ? articleRevers
                                  .filter(article => article.categories.name === catFiltre)
                                  .slice(0, nombreArticle)
                                  .map((article, index) => {
                                      return (
                                          <View key={index}>
                                              <ArticleCard
                                                  articleRevers={articleRevers}
                                                  props={props}
                                                  article={article}
                                              />
                                          </View>
                                      );
                                  })
                            : articleRevers.slice(0, nombreArticle).map((article, index) => {
                                  return (
                                      <View key={index}>
                                          <ArticleCard articleRevers={articleRevers} props={props} article={article} />
                                      </View>
                                  );
                              })}
                    </View>
                ) : (
                    <Loader />
                )}
            </View>
            <View style={styles.containerFAQ}>
                <View style={CENTER}>
                    <Text style={TITLE}>Foire aux questions</Text>
                </View>
                {faqs ? (
                    faqs.map(faq => {
                        return (
                            <View key={faq.id}>
                                <Faq faq={faq} />
                            </View>
                        );
                    })
                ) : (
                    <Loader />
                )}
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    containerInfos: {
        paddingHorizontal: 15,
        paddingBottom: 25,
    },
    colorBlack: {
        color: 'black',
    },
    filtreContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    filtre: {
        width: 130,
        height: 25,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    // Style FAQ
    containerFAQ: {
        marginHorizontal: 15,
        marginBottom: 25,
    },
});
export default Actualite;
