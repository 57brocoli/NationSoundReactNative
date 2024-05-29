import {View, Text, StyleSheet, FlatList, Image, Dimensions, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {PARAGRAPH, TITLE} from '../../asset/constantes/Constantes';
import RequesteForm from '../../Conposants/SousComposants/RequesteForm';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHeader} from '../../../redux/reducers/sectionContenuReducer';
import HeaderPage from '../../Conposants/Page1/HeaderPage';

const Apropos = ({}) => {
    //Importation de tous les sections depuis le reducer
    const dispatch = useDispatch();
    const views = useSelector(state => state.views.views);

    useEffect(() => {
        dispatch(fetchHeader());
    }, [dispatch]);
    //Variable pour acceder au dossier qui contient les images
    if (views) {
        var apropos = views.find(x => x.name === 'apropos');
    }
    const image = {
        uri: 'https://pixelevent.site/assets/uploads/figure/',
    };

    return (
        <View style={styles.flex}>
            <ScrollView>
                <HeaderPage data={apropos} />
                {views
                    ? views
                          .filter(view => view.name === 'apropos')
                          .map((view, index) => {
                              return (
                                  <View key={index}>
                                      {view
                                          ? view.pageSections.map((section, id) => {
                                                return (
                                                    <View key={id} style={styles.container}>
                                                        <Text style={TITLE}>{section.title}</Text>

                                                        {section.title === 'Nous contacter' ? <RequesteForm /> : ''}

                                                        <Text style={PARAGRAPH} id="contact">
                                                            {section.content}
                                                        </Text>
                                                        <FlatList
                                                            horizontal={true}
                                                            data={section.images}
                                                            keyExtractor={item => item.id}
                                                            renderItem={({item}) => {
                                                                return (
                                                                    <Image
                                                                        source={{
                                                                            uri: `${image.uri}${item.name}`,
                                                                        }}
                                                                        style={styles.Remercimentimages}
                                                                    />
                                                                );
                                                            }}
                                                        />
                                                    </View>
                                                );
                                            })
                                          : ''}
                                  </View>
                              );
                          })
                    : ''}
            </ScrollView>
        </View>
    );
};
const widthScreen = Dimensions.get('window').width;
const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        margin: 15,
    },
    Remercimentimages: {
        marginTop: 10,
        width: widthScreen - 130,
        height: 150,
    },
});

export default Apropos;
