import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import des composant exterieurs
import Footer from '../Conposants/Footer';
import HeaderPage from '../Conposants/Page1/HeaderPage';
import Billetterie from '../Conposants/Page1/Billetterie/Billetterie';
import Programme from '../Conposants/Page1/Programme/Programme';
import Information from '../Conposants/Page1/Information';
//import d'axios pour recupérer les données
import axios from 'axios';
//import de moment pour formater la date
import {Dimensions} from 'react-native';
import NavBar from '../Conposants/NavBar';
import Apropos from '../Conposants/Page1/Apropos';
import Sponsor from '../Conposants/Page1/Sponsor';

const Page1 = props => {
    //Variable pour recupéré les props passer dans la route
    const {
        pageBilletterie,
        pageProgramme,
        pageInformation,
        pageSponsor,
        pageApropos,
    } = props.route.params;

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
            .then(res => setArticles(res.data['hydra:member']));

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
    const [articles, setArticles] = useState([]);

    //Variables de stockage de la FAQ provenant de l'api
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
            <NavBar props={props} />
            <ScrollView>
                <LinearGradient
                    colors={['#f1793c', '#6c24dd', '#5dd29b']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.screen}>
                    <View>
                        {Allsview && (
                            <View>
                                {pageBilletterie && (
                                    <View>
                                        <HeaderPage
                                            data={Allsview[1]}
                                            folder={imgView.uri}
                                            file={Allsview[1].headerImage.name}
                                        />
                                        <Billetterie
                                            billets={billets}
                                            props={props}
                                        />
                                    </View>
                                )}
                                {pageProgramme && (
                                    <View>
                                        <HeaderPage
                                            data={Allsview[2]}
                                            folder={imgView.uri}
                                            file={Allsview[2].headerImage.name}
                                        />
                                        <Programme
                                            programme={programme}
                                            props={props}
                                        />
                                    </View>
                                )}
                                {pageInformation && (
                                    <View>
                                        <HeaderPage
                                            data={Allsview[3]}
                                            folder={imgView.uri}
                                            file={Allsview[3].headerImage.name}
                                        />
                                        <Information
                                            articles={articles}
                                            faqs={faqs}
                                            props={props}
                                        />
                                    </View>
                                )}
                                {pageSponsor && (
                                    <View>
                                        <HeaderPage
                                            data={Allsview[4]}
                                            folder={imgView.uri}
                                            file={Allsview[4].headerImage.name}
                                        />
                                        <Sponsor sponsors={sponsors} />
                                    </View>
                                )}
                                {pageApropos && (
                                    <View>
                                        <HeaderPage
                                            data={Allsview[5]}
                                            folder={imgView.uri}
                                            file={Allsview[5].headerImage.name}
                                        />
                                        <Apropos
                                            views={Allsview}
                                            props={props}
                                        />
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
