import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {PARAGRAPH, TITLE} from '../../asset/constantes/Constantes';
import RequesteForm from '../../Conposants/SousComposants/RequesteForm';

const Apropos = ({views}) => {
  //Variable pour acceder au dossier qui contient les images
  const image = {
    uri: 'https://pixelevent.site/assets/uploads/figure/',
  };

  return (
    <View>
      {views
        ? views
            .filter(view => view.name === 'a-propos')
            .map((view, index) => {
              return (
                <View key={index}>
                  {view
                    ? view.pageSections.map((section, id) => {
                        return (
                          <View key={id} style={styles.container}>
                            <Text style={TITLE}>{section.title}</Text>
                            {section.title === 'Nous contacter' ? (
                              <RequesteForm />
                            ) : (
                              ''
                            )}
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
    </View>
  );
};
const widthScreen = Dimensions.get('window').width;
const styles = StyleSheet.create({
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
