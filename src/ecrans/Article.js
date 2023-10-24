import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import des composant exterieurs
import Footer from '../conposants/Footer';
//import des variables de style prédéfinis
import {CENTER, TITLE} from '../constantes/Constantes';
import {COLORS} from '../constantes/Couleurs';
import {STYLESHEADER} from '../constantes/StylesHeader';
import {STYLESMENU} from '../constantes/StyleMenu';
import {STYLEBOUTTONRETOUR} from '../constantes/StyleButtonRetour';
//import des icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import de Firebase
import auth from '@react-native-firebase/auth';
import {FlatList} from 'react-native';
import axios from 'axios';

const Article = ({route, navigation}) => {
  const {id, title, content, featuredImage, intro, images} = route.params;
  //Variable pour afficher/masquer le menu
  const [showMenu, setShowMenu] = useState(false);
  //Varible d'animation lors de l'affichage/masquage de menu
  const slideMenu = useRef(new Animated.Value(260)).current;
  const scralView = useRef(new Animated.Value(1)).current;
  const filtre = useRef(new Animated.Value(1)).current;

  //Variable du header
  const Header = () => {
    return (
      <View style={STYLESHEADER.header}>
        <View style={STYLESHEADER.nav}>
          <TouchableOpacity onPress={() => navigation.navigate('Accueil1')}>
            <Image
              source={require('../asset/img/logo.jpg')}
              style={STYLESHEADER.iconNav}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowMenu(!showMenu);
              Animated.timing(slideMenu, {
                toValue: showMenu ? 260 : 0,
                duration: 300,
                useNativeDriver: true,
              }).start();
              Animated.timing(scralView, {
                toValue: showMenu ? 1 : 0.95,
                duration: 300,
                useNativeDriver: true,
              }).start();
              Animated.timing(filtre, {
                toValue: showMenu ? 1 : 0.5,
                duration: 300,
                useNativeDriver: true,
              }).start();
            }}>
            <MaterialCommunityIcons
              name={showMenu ? 'close' : 'menu'}
              color={'white'}
              size={50}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  //Variable pour le menu
  const Menu = () => {
    // variable pour se deconnecter
    const onSingOut = () => {
      auth()
        .signOut()
        .then(() => {
          console.log('User signed out!');
          navigation.navigate('LogIn');
        });
    };

    return (
      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: COLORS.mauveClaire,
          position: 'absolute',
          height: 623,
          top: 70,
          right: 0,
          transform: [{translateX: slideMenu}],
        }}>
        <LinearGradient
          colors={[COLORS.mauveClaire, COLORS.mauveFonce]}
          style={{paddingHorizontal: 15, paddingVertical: 10}}>
          <View style={STYLESMENU.containerMenu}>
            {/* container de la photo de Profile */}
            <TouchableOpacity
              style={STYLESMENU.containerUserIcon}
              onPress={() => navigation.navigate('Profil')}>
              <Image
                source={require('../asset/icons/userIcon.png')}
                style={STYLESMENU.userIcon}
              />
              <Text style={STYLESMENU.lienVersProfil}>Voir Profile</Text>
            </TouchableOpacity>
            {/* fin container de la photo de Profile */}

            {/* container du nom de l'utilisateur */}
            {auth() ? (
              <Text style={STYLESMENU.nameUser}>
                {auth().currentUser.displayName}
              </Text>
            ) : (
              ''
            )}
            {/* fin container du nom de l'utilisateur */}

            {/* container des liens de navigation*/}
            <View style={STYLESMENU.containerLink}>
              <TouchableOpacity
                style={STYLESMENU.lienNav}
                onPress={() => navigation.navigate('Accueil1')}>
                <MaterialCommunityIcons
                  name="home"
                  color={COLORS.mauveClaire}
                  size={30}
                />
                <Text style={STYLESMENU.textLink}>Accueil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={STYLESMENU.lienNav}
                onPress={() => navigation.navigate('Billetterie')}>
                <MaterialCommunityIcons
                  name="ticket"
                  color={COLORS.mauveClaire}
                  size={30}
                />
                <Text style={STYLESMENU.textLink}>Billetterie</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={STYLESMENU.lienNav}
                onPress={() => navigation.navigate('Programme')}>
                <MaterialCommunityIcons
                  name="clipboard-list"
                  color={COLORS.mauveClaire}
                  size={30}
                />
                <Text style={STYLESMENU.textLink}>Programme</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={STYLESMENU.lienNav}
                onPress={() => navigation.navigate('Information')}>
                <MaterialCommunityIcons
                  name="information"
                  color={COLORS.mauveClaire}
                  size={30}
                />
                <Text style={STYLESMENU.textLink}>Information</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={STYLESMENU.lienNav}
                onPress={() => navigation.navigate('Map')}>
                <MaterialCommunityIcons
                  name="map"
                  color={COLORS.mauveClaire}
                  size={30}
                />
                <Text style={STYLESMENU.textLink}>Map</Text>
              </TouchableOpacity>
            </View>
            {/* fin container des liens de navigation*/}

            {/*container se deconnecter*/}
            <TouchableOpacity
              style={STYLESMENU.containerLinkDeconnexion}
              onPress={() => onSingOut()}>
              <MaterialCommunityIcons name="logout" color={'white'} size={30} />
              <Text style={STYLESMENU.textDeconnexion}>Déconnexion</Text>
            </TouchableOpacity>
            {/*container se deconnecter*/}
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };
  //Variable de navigation Boutton retour
  const BouttonRetour = () => {
    return (
      <TouchableOpacity
        style={STYLEBOUTTONRETOUR.container}
        onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons
          name={'chevron-left'}
          color={'white'}
          size={40}
        />
        <Text style={STYLEBOUTTONRETOUR.text}>Retour</Text>
      </TouchableOpacity>
    );
  };
  //Variable pour avoir la largeur de l'ecran
  const {width} = useWindowDimensions();
  //Variable pour avoir les commentaires
  useEffect(() => {
    axios
      .get('https://pixelevent.site/api/comments')
      .then(res => setComments(res.data['hydra:member']));
  }, []);
  const [comments, setComments] = useState([]);
  // Variable du commentaire
  const [commentaire, setCommentaire] = useState('');
  // Fonction pour envoyer le commentaire
  const sendComment = async () => {
    await fetch('https://pixelevent.site/api/comments', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        content: commentaire,
        author: '/api/users/57',
        relatedArticle: '/api/articles/' + id,
        created_at: 'CURRENT_TIMESTAMP',
        createdAt: '2023-10-23T11:34:24.704Z',
      }),
    });
    axios
      .get('https://pixelevent.site/api/comments')
      .then(res => setComments(res.data['hydra:member']));
  };
  return (
    <View>
      <Header />
      <BouttonRetour />
      <ScrollView>
        <LinearGradient
          colors={['#f1793c', '#6c24dd', '#5dd29b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0.91}}>
          <Animated.View
            style={{
              opacity: filtre,
              transform: [{scale: scralView}],
            }}>
            <Image
              style={styles.img}
              source={{
                uri: `https://pixelevent.site/assets/uploads/articles/${featuredImage}`,
              }}
            />
            <View style={CENTER}>
              <Text style={TITLE}>{title}</Text>
            </View>
            <View style={CENTER}>
              <Text style={styles.content}>{intro}</Text>
            </View>
            <View style={CENTER}>
              <Text style={styles.content}>{content}</Text>
            </View>
            <FlatList
              horizontal={true}
              data={images}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <Image
                    style={{
                      width: width - 40,
                      height: 200,
                    }}
                    source={{
                      uri: `https://pixelevent.site/assets/uploads/articles/diapo/${item.name}`,
                    }}
                  />
                );
              }}
            />

            {/* Section commentaires */}
            <View style={styles.sectionCommentaires}>
              <View style={CENTER}>
                <Text style={TITLE}>Commentaires</Text>
              </View>
              {comments ? (
                comments
                  .filter(function (item) {
                    return item.relatedArticle.id === id;
                  })
                  .map((comment, index) => {
                    return (
                      <View key={index}>
                        <Text style={styles.sectionCommentairesAuthor}>
                          {comment.author.firstname} {comment.author.lastname}
                        </Text>
                        <Text style={styles.sectionCommentairesContent}>
                          {comment.content}
                        </Text>
                      </View>
                    );
                  })
              ) : (
                <View style={styles.activityIndicator}>
                  <ActivityIndicator size="large" color="#00ff00" />
                </View>
              )}
              <View style={styles.sectionNewCommentaire}>
                <Text>Nouveau commentaire</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => setCommentaire(text)}
                  // value={commentaire}
                  placeholder="Commentaire"
                />
                {commentaire ? (
                  <Pressable onPress={sendComment} style={styles.envoyer}>
                    <Text style={styles.envoyerText}>Envoyer</Text>
                  </Pressable>
                ) : (
                  ''
                )}
              </View>
            </View>
          </Animated.View>
        </LinearGradient>
        <Footer />
      </ScrollView>
      <Menu />
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    height: 450,
    width: '105%',
    marginTop: 55,
    right: 20,
    marginBottom: 20,
  },
  title: {
    color: COLORS.orange,
  },
  content: {
    color: 'white',
    textAlign: 'justify',
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // style pour les commentaires
  sectionCommentaires: {
    padding: 15,
  },
  sectionCommentairesTitle: {
    // fontSize: 16,
    // fontWeight: 'bold',
    textAlign: 'center',
    // color: COLORS.orange,
    margin: 10,
  },
  sectionCommentairesAuthor: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  sectionCommentairesContent: {
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  // Section nouveau commentaire
  sectionNewCommentaire: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: 5,
  },
  envoyer: {
    backgroundColor: COLORS.mauveClaire,
    width: 70,
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  envoyerText: {
    color: 'white',
    textAlign: 'center',
  },
});
export default Article;
