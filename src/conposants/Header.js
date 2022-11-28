import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {FONTS} from '../constantes/Fonts';

const Header = () => {
  // variable pour afficher ou masquer le panier
  const [menu, setMenu] = useState(false);
  const showMenu = () => setMenu(!menu);
  // variable pour fermer le panier
  // const closeMenu = () => {
  //   menu && setMenu(false);
  // };

  return (
    <View style={styles.header}>
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
        <TouchableOpacity onPress={showMenu}>
          <Image
            source={require('../asset/img/burgerBoton.png')}
            style={styles.iconNav}
          />
        </TouchableOpacity>
      </View>

      {/* Menu burgeur */}
      <View style={menu ? styles.menuactive : styles.menudesactive}>
        <TouchableOpacity style={styles.containerLienMenu}>
          <Text style={styles.lienMenu}>Acceuil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerLienMenu}>
          <Text style={styles.lienMenu}>Billetterie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerLienMenu}>
          <Text style={styles.lienMenu}>Programme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerLienMenu}>
          <Text style={styles.lienMenu}>Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerLienMenu}>
          <Text style={styles.lienMenu}>Maps</Text>
        </TouchableOpacity>
      </View>
      {/* Fin menu burgeur */}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    zIndex: 1,
    position: 'absolute',
    width: '100%',
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
  menuactive: {
    width: '50%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    right: '-50%',
  },
  menudesactive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    right: '-100%',
    display: 'none',
  },
  containerLienMenu: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  lienMenu: {
    fontFamily: FONTS.titre,
    fontSize: 24,
    color: 'black',
    marginHorizontal: 15,
  },
});
export default Header;
