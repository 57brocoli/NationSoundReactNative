// importation react
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
// importation bibliotheque
import LinearGradient from 'react-native-linear-gradient';
//import des composant exterieurs
import Footer from '../Conposants/Footer';
import HeaderPage from '../Conposants/Page1/HeaderPage';
import Billetterie from '../Conposants/Page1/Billetterie/Billetterie';
import Programme from '../Conposants/Page1/Programme/Programme';
import Information from '../Conposants/Page1/Information';
import NavBar from '../Conposants/NavBar';
import Apropos from '../Conposants/Page1/Apropos';
import Sponsor from '../Conposants/Page1/Sponsor';
import PageSection from '../Conposants/SousComposants/PageSection';
//import d'axios pour recupérer les données
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
    fetchArticle,
    fetchBillets,
    fetchFaq,
    fetchHeader,
    fetchProgramme,
    fetchSponsors,
} from '../../redux/reducers/sectionContenuReducer';

const Page1 = props => {
    //Variable pour recupéré les props passer dans la route
    const {pageBilletterie, pageProgramme, pageInformation, pageSponsor, pageApropos} = props.route.params;

    //Importation de tous les sections depuis le reducer
    const dispatch = useDispatch();
    const billets = useSelector(state => state.billets.billets);
    const programme = useSelector(state => state.programme.programme[0]);
    const articles = useSelector(state => state.articles.articles[0]);
    const faq = useSelector(state => state.faq.faq[0]);
    const sponsors = useSelector(state => state.sponsors.sponsors[0]);
    const views = useSelector(state => state.views.views[0]);

    useEffect(() => {
        dispatch(fetchBillets());
        dispatch(fetchProgramme());
        dispatch(fetchArticle());
        dispatch(fetchFaq());
        dispatch(fetchSponsors());
        dispatch(fetchHeader());
    }, [dispatch]);

    // console.log(views);
    useEffect(() => {
        axios
            .get('https://pixelevent.site/api/views')
            .then(res => setAllsView(res.data['hydra:member']))
            .catch(Error => console.log('erreur : ', Error));
    }, []);

    //Variables de stockage du contenu de la page et des articles provenant de l'api
    const [Allsview, setAllsView] = useState([]);

    //Chemin d'acces au dossier des images des view
    const imgView = {
        uri: 'https://pixelevent.site/assets/uploads/figure/',
    };

    console.log(views);

    // Variable pour récupéré le header de chaque pages
    if (views) {
        var billet = Allsview.find(x => x.name === 'billetterie');

        var prog = Allsview.find(x => x.name === 'programme');

        var info = Allsview.find(x => x.name === 'actualite');

        var spons = Allsview.find(x => x.name === 'sponsor');

        var apropos = Allsview.find(x => x.name === 'apropos');
    }

    return (
        <>
            <NavBar props={props} />
            <ScrollView>
                <LinearGradient
                    colors={['#f1793c', '#6c24dd', '#5dd29b']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.screen}>
                    <View>
                        {views && (
                            <View>
                                {pageBilletterie && (
                                    <View>
                                        <HeaderPage data={billet} folder={imgView.uri} />
                                        <Billetterie billets={billets} props={props} />
                                    </View>
                                )}
                                {pageProgramme && (
                                    <View>
                                        <HeaderPage data={prog} folder={imgView.uri} />
                                        <Programme programme={programme} props={props} />
                                    </View>
                                )}
                                {pageInformation && (
                                    <View>
                                        <HeaderPage data={info} folder={imgView.uri} />
                                        <Information articles={articles} faqs={faq} props={props} />
                                    </View>
                                )}
                                {pageSponsor && (
                                    <View>
                                        <HeaderPage data={spons} folder={imgView.uri} />
                                        <Sponsor sponsors={sponsors} />
                                    </View>
                                )}
                                {pageApropos && (
                                    <View>
                                        <HeaderPage data={apropos} folder={imgView.uri} />
                                        <Apropos views={Allsview} props={props} />
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
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
export default Page1;
