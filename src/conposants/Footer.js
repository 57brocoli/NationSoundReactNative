import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../asset/constantes/Couleurs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Footer = ({props}) => {
    return (
        <View style={styles.footer}>
            <View style={styles.logo}>
                <Image
                    source={require('../asset/img/logo.jpg')}
                    style={styles.logoImg}
                />
                <Text style={styles.logoTitle}>Nation Sounds</Text>
            </View>
            <View style={styles.containerIconRS}>
                <TouchableOpacity>
                    <Image
                        source={require('../asset/img/facebook_logo.png')}
                        style={styles.iconRS}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../asset/img/instagram_logo.png')}
                        style={styles.iconRS}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../asset/img/youtube_logo.png')}
                        style={styles.iconRS}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../asset/img/snapchat_logo.png')}
                        style={styles.iconRS}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../asset/img/twitter_logo.png')}
                        style={styles.iconRS}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../asset/img/linkedin_logo.png')}
                        style={styles.iconRS}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.footerList}>
                <TouchableOpacity
                    style={styles.containerLi}
                    onPress={() =>
                        // props.navigation.navigate('Page1', {
                        //   pageApropos: 'ok',
                        // })
                        window.scroll(0, 50)
                    }>
                    <MaterialCommunityIcons
                        name="contacts"
                        color={COLORS.mauveFonce}
                        size={20}
                    />
                    <Text style={styles.textLi}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerLi}>
                    <MaterialCommunityIcons
                        name="information"
                        color={COLORS.mauveFonce}
                        size={20}
                    />
                    <Text style={styles.textLi}>Infos pratiques</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerLi}>
                    <MaterialCommunityIcons
                        name="file-document-outline"
                        color={COLORS.mauveFonce}
                        size={20}
                    />
                    <Text style={styles.textLi}>Mentions légales</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.mentionsLegales}>
                <Text style={styles.textMentionLegales}>
                    &copy; - Nation Sounds - 2022
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#5dd29b',
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginHorizontal: 15,
        marginTop: 15,
    },
    logoImg: {
        height: 80,
        width: 80,
        borderRadius: 10,
    },
    logoTitle: {
        marginHorizontal: 10,
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
    },
    containerIconRS: {
        flexDirection: 'row',
        marginTop: 15,
        marginHorizontal: 2,
    },
    iconRS: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginHorizontal: 8,
    },
    footerList: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    containerLi: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 15,
    },
    textLi: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
    mentionsLegales: {
        marginTop: 20,
        backgroundColor: '#1c043c',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textMentionLegales: {
        color: 'white',
    },
});

export default Footer;
