import {View, Text, Dimensions, StyleSheet, Image, FlatList} from 'react-native';
import React from 'react';
import {FONTS} from '../../asset/constantes/Fonts';
import {COLORS} from '../../asset/constantes/Couleurs';
import {TEXT} from '../../asset/constantes/Constantes';

const PageSection = ({data}) => {
    if (data) {
        var sections = data.pageSections;
    }
    const image = {
        uri: 'https://pixelevent.site/assets/uploads/figure/',
    };
    return (
        <View>
            {sections &&
                sections.map((sec, index) => {
                    return (
                        <View key={index}>
                            {sec.display === 'style1' && (
                                <View style={styles.containerSection}>
                                    <Text style={styles.title}>{sec.title}</Text>
                                    <View>
                                        <Text style={TEXT}>{sec.content}</Text>
                                        <FlatList
                                            horizontal={true}
                                            data={sec.images}
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
                                </View>
                            )}
                        </View>
                    );
                })}
        </View>
    );
};
const widthScreen = Dimensions.get('window').width;
const styles = StyleSheet.create({
    containerBillet: {
        marginVertical: 17,
        backgroundColor: 'grey',
        borderRadius: 10,
    },

    containerSection: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    title: {
        fontFamily: FONTS.titre,
        fontSize: 24,
        color: COLORS.jaune,
        textAlign: 'center',
    },
    Remercimentimages: {
        marginTop: 10,
        width: widthScreen - 30,
        height: 200,
        borderRadius: 10,
    },
});
export default PageSection;
