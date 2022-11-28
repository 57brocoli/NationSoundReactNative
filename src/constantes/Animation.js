import {View, Text, Animated} from 'react-native';
import React, {useRef} from 'react';

export const slideMenu = () => {
  const FonctionslideMenu = useRef(new Animated.Value(0)).current;
  Animated.timing(FonctionslideMenu, {
    toValue: showMenu ? 221 : 0,
    duration: 400,
    useNativeDriver: true,
  }).start();
};
