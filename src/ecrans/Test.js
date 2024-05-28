import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBillets, fetchProgramme} from '../../redux/reducers/sectionContenuReducer';

const Test = props => {
    const dispatch = useDispatch();
    const billets = useSelector(state => state.billets.billets);
    const programme = useSelector(state => state.programme.programme);

    useEffect(() => {
        dispatch(fetchBillets());
        dispatch(fetchProgramme());
    }, [dispatch]);

    console.log(billets);
    return (
        <View style={{flex: 1}}>
            {/* {programme.map((day, index) => {
                return (
                    <View key={index}>
                        <Text>{day.name}</Text>
                    </View>
                );
            })} */}
        </View>
    );
};

export default Test;
