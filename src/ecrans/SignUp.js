import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constantes/Couleurs';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

const SignUp = props => {
  // variable des données de l'utilisateur
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState();
  const [open, setOpen] = useState(false);

  // fonction pour s'inscrire
  const onSingUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async response => {
        await response.user.updateProfile({
          displayName: name,
        });
        console.log('User account created & signed in!', phoneNumber);
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
        alert('Erreur');
      });
  };
  moment.locale('fr');

  return (
    <ScrollView>
      <SafeAreaView style={styles.root}>
        <View style={styles.logo}>
          <Image
            source={require('../asset/img/logo.jpg')}
            style={{height: 100, width: 100, borderRadius: 10}}
          />
          <Text style={styles.title}>Inscrition</Text>
        </View>

        {/* zone de saisie */}
        <View style={styles.inputContainer}>
          <Entypo
            name="account"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TextInput
            style={styles.input}
            placeholder={'Entrer votre Nom'}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Entypo
            name="phone"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TextInput
            style={styles.input}
            placeholder={'Entrer votre numero de téléphone'}
            onChangeText={text => setPhoneNumber(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Entypo
            name="calendar"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TouchableOpacity
            style={{flex: 1, paddingVertical: 15}}
            onPress={() => setOpen(true)}>
            <Text>
              {birthDate === undefined
                ? 'Entrer votre date de naissance'
                : moment(birthDate).format('DD-MM-YYYY')}
            </Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          locale={'fr'}
          title={'Date de naissance'}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setBirthDate(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <View style={styles.inputContainer}>
          <Entypo
            name="email"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TextInput
            style={styles.input}
            placeholder={'Entrer votre email'}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TextInput
            style={styles.input}
            placeholder={'Entrer votre mot de passe'}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TextInput
            style={styles.input}
            placeholder={'Confirmer votre mot de passe'}
            secureTextEntry
          />
        </View>

        {/* Button Action */}
        <TouchableOpacity
          style={styles.touchablebutton}
          onPress={() => onSingUp()}>
          <Text style={styles.touchableText}>S'inscrire</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.textCenter}>Me connecter avec</Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.icon}>
            <MaterialCommunityIcons name="facebook" size={35} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <MaterialCommunityIcons
              name="instagram"
              size={35}
              color="#E829DE"
            />
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
          <Text style={{textAlign: 'center'}}>Déja un compte ? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('LogIn')}>
            <Text style={{textAlign: 'center', color: COLORS.mauveClaire}}>
              Me connecter
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
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
export default SignUp;
