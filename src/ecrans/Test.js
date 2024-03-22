import {View, Text, Button} from 'react-native';
import React, {useRef} from 'react';
import RNGoogleRecaptcha from 'react-native-google-recaptcha';

const Test = props => {
    const recaptchaRef = useRef(null);

    const handleOpenRecaptcha = () => {
        recaptchaRef.current.open();
    };

    return (
        <View>
            <Text>Test</Text>
            <Button title="Verification" onPress={handleOpenRecaptcha} />
            <RNGoogleRecaptcha
                ref={recaptchaRef}
                siteKey={'6LcHJqApAAAAAJM--M7PlMe663YUMk_f-uXFs7s5'}
                baseUrl={'https://pixelevent.site'}
                lang="fr"
                onVerify={() => props.navigation.navigate('Accueil1')}
            />
            <Text>mklj</Text>
        </View>
    );
};

export default Test;
