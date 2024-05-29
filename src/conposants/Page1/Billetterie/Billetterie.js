import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Loader from '../../SousComposants/Loader';
import Billet from '../../SousComposants/Billet';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBillets, fetchHeader} from '../../../../redux/reducers/sectionContenuReducer';
import HeaderPage from '../../../Conposants/Page1/HeaderPage';

const Billetterie = ({props}) => {
    // Importation du reducer
    const dispatch = useDispatch();
    const billets = useSelector(state => state.billets.billets);
    const views = useSelector(state => state.views.views);
    useEffect(() => {
        dispatch(fetchBillets());
        dispatch(fetchHeader());
    }, [dispatch]);
    if (views) {
        var billetterie = views.find(x => x.name === 'billetterie');
    }

    return (
        <View>
            <HeaderPage data={billetterie} />
            {!billets ? (
                <Loader />
            ) : (
                billets.map((billet, index) => {
                    return (
                        <View key={index} style={styles.containerBillet}>
                            <Billet billet={billet} props={props} />
                        </View>
                    );
                })
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    containerBillet: {
        marginVertical: 17,
        backgroundColor: 'grey',
        borderRadius: 10,
    },
});
export default Billetterie;
