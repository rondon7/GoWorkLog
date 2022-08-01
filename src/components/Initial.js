import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Initial = ({ navigation }) => {

    useEffect(() => {
        const find = async () => {
            let UID = await AsyncStorage.getItem('curUser');
            if (UID) {
                navigation.navigate('dashboard', {
                    userUid: UID,
                });
            } else {
                navigation.navigate('login');
            }
        };
        find();
    }, []);

    return (
        <>
            <View style={{ backgroundColor: 'cornflowerblue', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={'darkturquoise'} size={'large'} />
            </View>
        </>
    )
}

export default Initial