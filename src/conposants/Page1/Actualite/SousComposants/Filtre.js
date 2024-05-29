import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Filtre = ({categories, catFiltre, setCatFiltre}) => {
    const [openCatFilter, setOpenCatFilter] = useState(false);
    return (
        <View style={styles.box}>
            <TouchableOpacity style={styles.filtre} onPress={() => setOpenCatFilter(!openCatFilter)}>
                <Text style={styles.colorBlack}>Categories</Text>
                {openCatFilter ? (
                    <MaterialCommunityIcons name="chevron-up" color={'black'} size={25} />
                ) : (
                    <MaterialCommunityIcons name="chevron-down" color={'black'} size={25} />
                )}
            </TouchableOpacity>
            {openCatFilter && (
                <View style={styles.filterSceneBox}>
                    {catFiltre && (
                        <TouchableOpacity
                            onPress={() => {
                                setCatFiltre(null);
                                setOpenCatFilter(!openCatFilter);
                            }}>
                            <Text style={styles.textFiltre}>Réinitialisé</Text>
                        </TouchableOpacity>
                    )}
                    {categories.map((cat, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setCatFiltre(cat);
                                    setOpenCatFilter(!openCatFilter);
                                }}>
                                <Text style={styles.textFiltre}>{cat}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    box: {
        display: 'flex',
        flexDirection: 'row',
    },
    colorBlack: {
        color: 'black',
    },
    filtre: {
        zIndex: 5,
        width: 130,
        height: 25,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    filterSceneBox: {
        position: 'absolute',
        zIndex: 3,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        top: 30,
        width: 130,
        borderRadius: 5,
    },
    textFiltre: {
        paddingVertical: 10,
        color: 'black',
    },
});
export default Filtre;
