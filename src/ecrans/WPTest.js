import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
// import axios from 'axios';

const WPTest = () => {
  const [article, setArticle] = useState([]);
  //   useEffect(() => {
  //     axios.get('https://nationsounds.fr/wp-json/').then(res => setArticle(res));
  //   }, []);
  return (
    <View>
      <Text onPress={() => console.log('jj')}>WPTest</Text>
    </View>
  );
};

export default WPTest;
