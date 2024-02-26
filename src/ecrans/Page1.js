import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import des composant exterieurs
import Footer from '../Conposants/Footer';
import HeaderPage from '../Conposants/Page1/HeaderPage';
import Billetterie from '../Conposants/Page1/Billetterie/Billetterie';
import Programme from '../Conposants/Page1/Programme/Programme';
import Information from '../Conposants/Page1/Information';
//import des variables de style prédéfinis
import {TEXT} from '../asset/constantes/Constantes';
//import d'axios pour recupérer les données
import axios from 'axios';
//import de moment pour formater la date
import {Dimensions} from 'react-native';
import NavBar from '../Conposants/NavBar';
import Apropos from '../Conposants/Page1/Apropos';
import Sponsor from '../Conposants/Page1/Sponsor';

const Sponsors = props => {
  //Variable pour recupéré les props passer dans l'url
  const {
    pageBilletterie,
    pageProgramme,
    pageInformation,
    pageSponsor,
    pageApropos,
  } = props.route.params;

  //Varible d'animation lors de l'affichage/masquage de menu
  const scralView = useRef(new Animated.Value(1)).current;
  const filtre = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    axios
      .get('https://pixelevent.site/api/views')
      .then(res => setAllsView(res.data['hydra:member']));

    axios
      .get('https://pixelevent.site/api/billets')
      .then(res => setBillets(res.data['hydra:member']));

    axios
      .get('https://pixelevent.site/api/days')
      .then(res => setProgramme(res.data['hydra:member']));

    axios
      .get('https://pixelevent.site/api/articles')
      .then(res => setListeArticles(res.data['hydra:member']));

    axios
      .get('https://pixelevent.site/api/f_a_qs')
      .then(res => setFaqs(res.data['hydra:member']));

    axios
      .get('https://pixelevent.site/api/sponsors')
      .then(res => setSponsors(res.data['hydra:member']));
  }, []);

  //variable pour stocker les billets
  const [billets, setBillets] = useState([]);

  //variable pour stocker le programme
  const [programme, setProgramme] = useState([]);

  //Variables de stockage du contenu des articles provenant de l'api
  const [listeArticles, setListeArticles] = useState([]);

  //Variables de stockage du contenu des articles provenant de l'api
  const [faqs, setFaqs] = useState([]);

  //Variable de stockage des sponsors
  const [sponsors, setSponsors] = useState([]);

  //Variables de stockage du contenu de la page et des articles provenant de l'api
  const [Allsview, setAllsView] = useState();

  //Chemin d'acces au dossier des images des view
  const imgView = {
    uri: 'https://pixelevent.site/assets/uploads/figure/',
  };

  return (
    <>
      {/* <Header /> */}
      <NavBar props={props} />
      <ScrollView>
        <View>
          {Allsview ? (
            <Animated.View
              style={{opacity: filtre, transform: [{scaleX: scralView}]}}>
              {pageBilletterie ? (
                <HeaderPage
                  data={Allsview[1]}
                  folder={imgView.uri}
                  file={Allsview[1].headerImage.name}
                />
              ) : (
                ''
              )}
              {pageProgramme ? (
                <HeaderPage
                  data={Allsview[2]}
                  folder={imgView.uri}
                  file={Allsview[2].headerImage.name}
                />
              ) : (
                ''
              )}
              {pageInformation ? (
                <HeaderPage
                  data={Allsview[3]}
                  folder={imgView.uri}
                  file={Allsview[3].headerImage.name}
                />
              ) : (
                ''
              )}
              {pageSponsor ? (
                <HeaderPage
                  data={Allsview[4]}
                  folder={imgView.uri}
                  file={Allsview[4].headerImage.name}
                />
              ) : (
                ''
              )}
              {pageApropos ? (
                <HeaderPage
                  data={Allsview[5]}
                  folder={imgView.uri}
                  file={Allsview[5].headerImage.name}
                />
              ) : (
                ''
              )}
            </Animated.View>
          ) : (
            ''
          )}
        </View>
        <LinearGradient
          colors={['#f1793c', '#6c24dd', '#5dd29b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.screen}>
          <Animated.View
            style={{opacity: filtre, transform: [{scale: scralView}]}}>
            <View>
              {Allsview ? (
                <View style={styles.headerText}>
                  {pageBilletterie ? (
                    <Text style={TEXT}>{Allsview[1].headerText}</Text>
                  ) : (
                    ''
                  )}
                  {pageProgramme ? (
                    <Text style={TEXT}>{Allsview[2].headerText}</Text>
                  ) : (
                    ''
                  )}
                  {pageInformation ? (
                    <Text style={TEXT}>{Allsview[3].headerText}</Text>
                  ) : (
                    ''
                  )}
                  {pageSponsor ? (
                    <Text style={TEXT}>{Allsview[4].headerText}</Text>
                  ) : (
                    ''
                  )}
                  {pageApropos ? (
                    <Text style={TEXT}>{Allsview[5].headerText}</Text>
                  ) : (
                    ''
                  )}
                </View>
              ) : (
                <View>
                  <ActivityIndicator size="large" color="#00ff00" />
                </View>
              )}
            </View>
            {pageBilletterie ? (
              <Billetterie billets={billets} props={props} />
            ) : (
              ''
            )}
            {pageProgramme ? (
              <Programme programme={programme} props={props} />
            ) : (
              ''
            )}
            {pageInformation ? (
              <Information
                listeArticles={listeArticles}
                faqs={faqs}
                props={props}
              />
            ) : (
              ''
            )}
            {pageSponsor ? <Sponsor sponsors={sponsors} /> : ''}
            {pageApropos ? <Apropos views={Allsview} props={props} /> : ''}
          </Animated.View>
        </LinearGradient>
        <Footer />
      </ScrollView>
    </>
  );
};

const ScreenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  screen: {
    minHeight: ScreenHeight - 245 - 70,
  },
  //style pour la page sponsor
  headerText: {
    marginVertical: 15,
  },
});
export default Sponsors;
