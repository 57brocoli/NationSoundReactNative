import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constantes/Couleurs';
import auth from '@react-native-firebase/auth';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //   Fonction pour se connecter
  const OnLoginPress = () => {
    console.log('login tentative');
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user.uid;
        console.log(
          'The user is connected, his ID is: ',
          uid,
          'Name:',
          auth().currentUser.displayName,
        );
        props.navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.logo}>
        <Image
          source={require('../asset/img/logo.jpg')}
          style={{height: 100, width: 100, borderRadius: 10}}
        />
        <Text style={styles.title}>Connection</Text>
      </View>

      {/* zone de saisie */}
      <View style={styles.inputContainer}>
        <Entypo name="email" size={20} color="#666" style={{marginRight: 5}} />
        <TextInput
          style={styles.input}
          placeholder={'Entrer votre email'}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="security"
          size={20}
          color="#666"
          style={{marginRight: 5}}
        />
        <TextInput
          style={styles.input}
          placeholder={'Entrer votre mot de passe'}
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity>
          <Text>Oublié ?</Text>
        </TouchableOpacity>
      </View>

      {/* Button Action */}
      <TouchableOpacity
        style={styles.touchablebutton}
        onPress={() => OnLoginPress()}>
        <Text style={styles.touchableText}>Se Connecter</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.textCenter}>Me connecter avec</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcons name="facebook" size={35} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcons name="instagram" size={35} color="#E829DE" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcons name="youtube" size={35} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcons name="snapchat" size={35} color="yellow" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcons name="twitter" size={35} color="#1e90ff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcons name="linkedin" size={35} color="blue" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginVertical: 30,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>Nouveau ? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
          <Text style={{textAlign: 'center', color: COLORS.mauveClaire}}>
            Crée un compte
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },
  logo: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 25,
  },
  input: {
    flex: 1,
  },
  touchablebutton: {
    marginBottom: 30,
    borderRadius: 5,
    padding: 20,
    backgroundColor: COLORS.mauveClaire,
  },
  touchableText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
    color: 'white',
  },
  textCenter: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
export default Login;
