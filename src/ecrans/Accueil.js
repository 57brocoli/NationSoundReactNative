import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
} from 'react-native';
import React from 'react';
import {FONTS} from '../constantes/Fonts';
import {CENTER, TEXT} from '../constantes/Constantes';
import {FakeData} from '../data/FakeHotelRestau';
import CardHotelRestau from '../conposants/CardHotelRestau';
import Footer from '../conposants/Footer';

const Accueil = () => {
  return (
    <ScrollView>
      <View>
        <ImageBackground
          source={require('../asset/img/paris6.jpg')}
          style={styles.background}>
          <View style={styles.nav}>
            <TouchableOpacity>
              <Image
                source={require('../asset/icons/userIcon.png')}
                style={styles.iconNav}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../asset/img/logo.jpg')}
                style={styles.iconNav}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../asset/img/burgerBoton.png')}
                style={styles.iconNav}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.logo}>Nation Sound</Text>
        </ImageBackground>

        {/* Section */}
        <View style={styles.section}>
          {/* Section programme */}
          <View>
            <View style={CENTER}>
              <Text style={styles.title}>Le programme</Text>
            </View>
            <View>
              <Text style={TEXT}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                eveniet quas, quo obcaecati a quaerat quasi ducimus cum adipisci
                inventore amet molestiae, quibusdam repellat doloribus iure
                libero numquam, consectetur quidem dolore aliquam odio! Rerum ab
                perferendis voluptatibus voluptatem ullam molestias doloribus ut
                alias explicabo? Beatae quas dignissimos sequi. Sint, corporis.
              </Text>
              <View style={styles.containerProgrammeImages}>
                <Image
                  source={require('../asset/img/artiste1.jpeg')}
                  style={styles.Programmeimages}
                />
                <Image
                  source={require('../asset/img/artiste2.jpg')}
                  style={styles.Programmeimages}
                />
                <Image
                  source={require('../asset/img/artiste3.jpg')}
                  style={styles.Programmeimages}
                />
              </View>
              <View style={CENTER}>
                <Pressable style={styles.button}>
                  <Text style={styles.textButton}>Programme</Text>
                </Pressable>
              </View>
            </View>
          </View>
          {/* Fin section programme */}
          {/* Section Remerciments */}
          <View>
            <View style={CENTER}>
              <Text style={styles.title}>Nos remerciments</Text>
            </View>
            <Text style={TEXT}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              beatae nisi veniam reiciendis autem ipsa accusantium eius sed
              tenetur commodi?
            </Text>
            <Image
              source={require('../asset/img/remerciment.jpg')}
              style={styles.Remercimentimages}
            />
            <View style={CENTER}>
              <Pressable style={styles.button}>
                <Text style={styles.textButton}>Sponsors</Text>
              </Pressable>
            </View>
          </View>
          {/* Fin section Remerciments */}
          {/* Section hotels/restaurants */}
          <View>
            <View style={CENTER}>
              <Text style={styles.title}>Hotel et Restaurants</Text>
            </View>
            <Text style={TEXT}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              beatae nisi veniam reiciendis autem ipsa accusantium eius sed
              tenetur commodi?
            </Text>
            <FlatList
              horizontal={true}
              data={FakeData}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return <CardHotelRestau item={item} />;
              }}
            />
          </View>
          {/* Fin section hotels/restaurants */}
          {/* Section map */}
          <View>
            <View style={CENTER}>
              <Text style={styles.title}>Explorez le site</Text>
            </View>
            <Text style={TEXT}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              beatae nisi veniam reiciendis autem ipsa accusantium eius sed
              tenetur commodi?
            </Text>
            <ImageBackground
              source={require('../asset/img/geolocalisation.png')}
              style={styles.geolocalisation}>
              <View style={styles.buttonMap}>
                <Pressable style={styles.button}>
                  <Text style={styles.textButton}>Ouvrir</Text>
                </Pressable>
              </View>
            </ImageBackground>
          </View>
          {/* Fin section map */}
        </View>
        {/* Fin section */}
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: 700,
  },
  nav: {
    height: 70,
    backgroundColor: 'rgba(255,255,255,0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconNav: {
    height: 50,
    width: 50,
    margin: 10,
  },
  logo: {
    fontFamily: 'RaphLanokFuture-PvDx',
    fontSize: 70,
    color: 'white',
    marginTop: 70,
  },
  title: {
    fontFamily: FONTS.titre,
    fontSize: 24,
    color: 'white',
  },
  section: {
    paddingHorizontal: 15,
    backgroundColor: 'black',
  },
  containerProgrammeImages: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  Programmeimages: {
    height: 170,
    width: 90,
    borderRadius: 10,
  },
  button: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#1c043c',
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  Remercimentimages: {
    marginTop: 10,
    width: 'auto',
    height: 200,
    borderRadius: 10,
  },
  geolocalisation: {
    height: 200,
    marginHorizontal: -15,
  },
  buttonMap: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 140,
  },
});

export default Accueil;
