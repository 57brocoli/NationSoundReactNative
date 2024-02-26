import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
//import des variables de style prédéfinis
import {FONTS} from '../../asset/constantes/Fonts';
import {CENTER, TITLE} from '../../asset/constantes/Constantes';
import {COLORS} from '../../asset/constantes/Couleurs';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../Conposants/SousComposants/Loader';
//import d'axios pour recupérer les données

const Information = ({listeArticles, faqs, props}) => {
  // const {width} = useWindowDimensions();

  //Fonctions pour filtrées les articles
  const [nombreArticle, setNombreArticle] = useState(3);
  const tousAfficher = () => {
    setNombreArticle(listeArticles.length);
  };
  const revenir = () => {
    setNombreArticle(3);
  };

  // Variable pour la F.A.Q
  const [question1, setQuestion1] = useState(false);
  const showReponse1 = () => {
    setQuestion1(!question1);
  };
  const [question2, setQuestion2] = useState(false);
  const showReponse2 = () => {
    setQuestion2(!question2);
  };
  const [question3, setQuestion3] = useState(false);
  const showReponse3 = () => {
    setQuestion3(!question3);
  };
  const [question4, setQuestion4] = useState(false);
  const showReponse4 = () => {
    setQuestion4(!question4);
  };

  const showReponse = responseId => {
    setQuestion1(!question1);
  };

  const image = {
    uri: 'https://pixelevent.site/assets/uploads/articles/',
  };

  return (
    <>
      <ScrollView>
        <View style={styles.containerInfos}>
          {listeArticles ? (
            <View>
              <View style={CENTER}>
                <Text style={TITLE}>Actualitées</Text>
              </View>
              {nombreArticle !== 3 ? (
                <TouchableOpacity
                  onPress={() => revenir()}
                  style={styles.filtre}>
                  <Text style={styles.colorBlack}>Revenir</Text>
                  <MaterialCommunityIcons
                    name="chevron-up"
                    color={'black'}
                    size={25}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => tousAfficher()}
                  style={styles.filtre}>
                  <Text style={styles.colorBlack}>Tous afficher</Text>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    color={'black'}
                    size={25}
                  />
                </TouchableOpacity>
              )}
              {listeArticles.slice(0, nombreArticle).map((article, index) => {
                return (
                  <TouchableOpacity
                    style={styles.card}
                    key={index}
                    // onPress={() =>
                    //   props.navigation.navigate('Article', {
                    //     id: article.id,
                    //     title: article.title,
                    //     intro: article.introduction,
                    //     content: article.content,
                    //     featuredImage: article.featuredImage,
                    //     images: article.images,
                    //   })
                    onPress={() =>
                      props.navigation.navigate('Page2', {
                        article: article,
                      })
                    }>
                    {/* Image à gauche */}
                    {!listeArticles ? (
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
            <View>
              {faqs[0] ? (
                <View style={styles.marginVertical}>
                  <TouchableOpacity
                    onPress={() => showReponse1()}
                    style={styles.containerQuestion}>
                    <Text style={styles.question}>{faqs[0].question}</Text>
                  </TouchableOpacity>
                  <View
                    style={question1 ? styles.reponseShow : styles.reponseHide}>
                    <Text>{faqs[0].answer}</Text>
                  </View>
                </View>
              ) : (
                ''
              )}
              {faqs[1] ? (
                <View style={styles.marginVertical}>
                  <TouchableOpacity
                    onPress={() => showReponse2()}
                    style={styles.containerQuestion}>
                    <Text style={styles.question}>{faqs[1].question}</Text>
                  </TouchableOpacity>
                  <View
                    style={question2 ? styles.reponseShow : styles.reponseHide}>
                    <Text>{faqs[1].answer}</Text>
                  </View>
                </View>
              ) : (
                ''
              )}
              {faqs[2] ? (
                <View style={styles.marginVertical}>
                  <TouchableOpacity
                    onPress={() => showReponse3()}
                    style={styles.containerQuestion}>
                    <Text style={styles.question}>{faqs[2].question}</Text>
                  </TouchableOpacity>
                  <View
                    style={question3 ? styles.reponseShow : styles.reponseHide}>
                    <Text>{faqs[2].answer}</Text>
                  </View>
                </View>
              ) : (
                ''
              )}
              {faqs[3] ? (
                <View style={styles.marginVertical}>
                  <TouchableOpacity
                    onPress={() => showReponse4()}
                    style={styles.containerQuestion}>
                    <Text style={styles.question}>{faqs[3].question}</Text>
                  </TouchableOpacity>
                  <View
                    style={question4 ? styles.reponseShow : styles.reponseHide}>
                    <Text>{faqs[3].answer}</Text>
                  </View>
                </View>
              ) : (
                ''
              )}
            </View>
          ) : (
            // faqs.map((faq, id) => {
            //     return (
            //       <View style={styles.marginVertical} key={id}>
            //         <TouchableOpacity
            //           onPress={() => showReponse()}
            //           style={styles.containerQuestion}>
            //           <Text>{faq.id}</Text>
            //           <Text style={styles.question}>{faq.question}</Text>
            //         </TouchableOpacity>
            //         <View
            //           class="2"
            //           style={
            //             question1 ? styles.reponseShow : styles.reponseHide
            //           }>
            //           <Text>{faq.answer}</Text>
            //         </View>
            //       </View>
            //     );
            //   })
            ''
          )}
          {/* <View style={styles.marginVertical}>
            <TouchableOpacity
              onPress={() => showReponse1()}
              style={styles.containerQuestion}>
              <Text style={styles.question}>Comment reserver un billet ?</Text>
            </TouchableOpacity>
            <View style={question1 ? styles.reponseShow : styles.reponseHide}>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias, saepe?
              </Text>
            </View>
          </View>
          <View style={styles.marginVertical}>
            <TouchableOpacity
              onPress={() => showReponse2()}
              style={styles.containerQuestion}>
              <Text style={styles.question}>Comment crée un compte ?</Text>
            </TouchableOpacity>
            <View style={question2 ? styles.reponseShow : styles.reponseHide}>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias, saepe?
              </Text>
            </View>
          </View>
          <View style={styles.marginVertical}>
            <TouchableOpacity
              onPress={() => showReponse3()}
              style={styles.containerQuestion}>
              <Text style={styles.question}>Accesibilité</Text>
            </TouchableOpacity>
            <View style={question3 ? styles.reponseShow : styles.reponseHide}>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias, saepe?
              </Text>
            </View>
          </View> */}
        </View>
      </ScrollView>
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
  marginVertical: {
    marginVertical: 5,
  },
  // Style FAQ
  containerFAQ: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  containerQuestion: {
    width: 382,
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
    borderRadius: 0,
    height: 50,
    color: 'black',
    paddingTop: 0,
    paddingHorizontal: 15,
  },
  reponseHide: {
    top: -50,
    display: 'none',
  },
  //style card
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
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  into: {
    color: 'white',
    overflow: 'hidden',
    textAlign: 'justify',
    height: 85,
    width: 230,
  },
});
export default Information;
