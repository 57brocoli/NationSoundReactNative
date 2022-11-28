import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constantes/Couleurs';
import LinearGradient from 'react-native-linear-gradient';
import {FakeSponsor} from '../data/FakeSponsor';
import {CENTER, TITLE} from '../constantes/Constantes';
import Footer from '../conposants/Footer';
import {FONTS} from '../constantes/Fonts';

const Parametres = props => {
  const [currentTab, setCurrentTab] = useState('Home');

  const [showMenu, setShowMenu] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: 'flex-start',
          padding: 15,
        }}>
        <Image
          source={require('../asset/icons/userIcon.png')}
          style={{
            width: 60,
            height: 60,
            marginTop: 8,
          }}></Image>

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 20,
          }}>
          Kyle Perry
        </Text>

        <TouchableOpacity>
          <Text style={{marginTop: 6, color: 'white'}}>View Profile</Text>
        </TouchableOpacity>

        <View style={{flexGrow: 1, marginTop: 50}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
              paddingLeft: 10,
              paddingRight: 30,
              borderRadius: 8,
              marginTop: 15,
            }}
            onPress={() => props.navigation.navigate('Accueil')}>
            <MaterialCommunityIcons name="home" color={'black'} size={30} />
            <Text>Accueil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
              paddingLeft: 10,
              paddingRight: 30,
              borderRadius: 8,
              marginTop: 15,
            }}
            onPress={() => props.navigation.navigate('Programme')}>
            <MaterialCommunityIcons
              name="clipboard-list"
              color={'black'}
              size={30}
            />
            <Text>Programme</Text>
          </TouchableOpacity>
          {TabButton(currentTab, setCurrentTab, 'Home', 'home')}
          {TabButton(
            currentTab,
            setCurrentTab,
            'Search',
            'card-search-outline',
          )}
          {TabButton(currentTab, setCurrentTab, 'Notification', 'bell')}
          {TabButton(currentTab, setCurrentTab, 'Setting', 'cog')}
        </View>
        <View>{TabButton(currentTab, setCurrentTab, 'Logout', 'logout')}</View>
      </View>
      {
        //over lay View...
      }
      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          transform: [{translateX: offsetValue}],
        }}>
        {
          //Menu Button...
        }
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: COLORS.mauveClaire,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Accueil')}>
            <Image
              source={require('../asset/img/logo.jpg')}
              style={{height: 50, width: 50, borderRadius: 7}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Animated.timing(offsetValue, {
                toValue: showMenu ? -200 : 0,
                duration: 300,
                useNativeDriver: true,
              }).start();
              setShowMenu(!showMenu);
            }}>
            <MaterialCommunityIcons name="menu" color={'black'} size={50} />
          </TouchableOpacity>
        </View>

        {/* <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            paddingTop: 20,
          }}>
          {currentTab}
        </Text> */}
        <ScrollView>
          <LinearGradient
            colors={['#f1793c', '#6c24dd', '#5dd29b']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.containerSponsors}>
            <View style={styles.containerTitle}>
              <View style={CENTER}>
                <Text style={TITLE}>Tous nos partenaires</Text>
              </View>
            </View>
            {FakeSponsor.map((sponsor, index) => {
              return (
                <View style={styles.cards} key={index}>
                  <Image source={sponsor.src} style={styles.img} />
                  <View>
                    <Text style={styles.cardTitle}>{sponsor.title}</Text>
                    <Text style={styles.cardText}>{sponsor.description}</Text>
                  </View>
                </View>
              );
            })}
          </LinearGradient>
          <Footer />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (title === 'Logout') {
        } else {
          setCurrentTab(title);
        }
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
          backgroundColor: currentTab === title ? 'white' : 'transparent',
          paddingLeft: 10,
          paddingRight: 30,
          borderRadius: 8,
          marginTop: 15,
        }}>
        <MaterialCommunityIcons
          name={image}
          color={currentTab === title ? '#5359D1' : 'white'}
          size={26}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingLeft: 15,
            color: currentTab === title ? '#5359D1' : 'white',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mauveClaire,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  //style sponsors
  containerSponsors: {
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
  containerTitle: {
    marginTop: 20,
    marginBottom: 15,
  },
  cards: {
    width: 381,
    height: 170,
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: 10,
  },
  img: {
    width: 170,
    height: 170,
    borderRadius: 10,
  },
  cardTitle: {
    color: 'white',
    width: 180,
    fontSize: 20,
    fontFamily: FONTS.titre,
    margin: 15,
  },
  cardText: {
    overflow: 'hidden',
    height: 80,
    width: 180,
    color: 'white',
    marginHorizontal: 15,
  },
});
export default Parametres;
