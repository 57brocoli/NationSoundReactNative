import {Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {STYLEBOUTTONRETOUR} from '../../asset/constantes/StyleButtonRetour';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BouttonRetour = ({props}) => {
    return (
        <TouchableOpacity
            style={STYLEBOUTTONRETOUR.container}
            onPress={() => props.navigation.goBack()}>
            <MaterialCommunityIcons
                name={'chevron-left'}
                color={'white'}
                size={40}
            />
            <Text style={STYLEBOUTTONRETOUR.text}>Retour</Text>
        </TouchableOpacity>
    );
};

export default BouttonRetour;
