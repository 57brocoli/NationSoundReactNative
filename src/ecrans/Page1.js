// importation react
import React from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
// importation bibliotheque
import LinearGradient from 'react-native-linear-gradient';
//import des composant exterieurs
import Footer from '../Conposants/Footer';
import Billetterie from '../Conposants/Page1/Billetterie/Billetterie';
import Programme from '../Conposants/Page1/Programme/Programme';
import Information from '../Conposants/Page1/Information';
import NavBar from '../Conposants/NavBar';
import Apropos from '../Conposants/Page1/Apropos';
import Sponsor from '../Conposants/Page1/Sponsor';

const Page1 = props => {
    //Variable pour recupéré les props passer dans la route
    const {pageBilletterie, pageProgramme, pageInformation, pageSponsor, pageApropos} = props.route.params;

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
                        <View>
                            {pageBilletterie && (
                                <View>
                                    <Billetterie props={props} />
                                </View>
                            )}
                            {pageProgramme && (
                                <View>
                                    <Programme props={props} />
                                </View>
                            )}
                            {pageInformation && (
                                <View>
                                    <Information props={props} />
                                </View>
                            )}
                            {pageSponsor && (
                                <View>
                                    <Sponsor />
                                </View>
                            )}
                            {pageApropos && (
                                <View>
                                    <Apropos props={props} />
                                </View>
                            )}
                        </View>
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
});
export default Page1;
