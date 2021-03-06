import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = (props) => {

    return (
        <View style={styles.header}>
            <Text>
                Welcome, &nbsp;
                <Text style={styles.usernameStyle}>{props.userName}</Text>
            </Text>
            <TouchableOpacity
                onPress={() => {
                    auth()
                        .signOut()
                        .then(() => {
                            console.log('User signed out!');
                            AsyncStorage.removeItem('curUser');
                            props.navigation.navigate('login');
                        })
                        .catch(error => Alert.alert(error.message));
                }}>
                <View>
                    <Text>Logout</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignSelf: 'stretch',
        height: 52,
        flexDirection: 'row',
        backgroundColor: 'darkturquoise',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 15,
    },
    usernameStyle: {
        fontWeight: '800',
    },
});

export default Header