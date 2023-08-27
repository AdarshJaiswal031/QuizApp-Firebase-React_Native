import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import * as Crypto from 'expo-crypto';
import Firebase from '../firebaseDev/firebaseConfig'
import 'firebase/database';
import LiveQuiz from './LiveQuiz';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const [hash, setHash] = useState('');
    useEffect(() => {
        checkLocalStorage();
    }, []);

    const checkLocalStorage = async () => {
        const storedHash = await AsyncStorage.getItem('quizKey');
        if (storedHash) {
            setHash(storedHash);
            setLoggedIn(true);
            navigation.navigate('LiveQuiz');

        }
    };
    const handleGenerateHash = async (email, password) => {
        const dataToHash = email + password;
        const hashedData = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, dataToHash);

        setHash(hashedData);
    };
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        if (email && isValidEmail(email) && password) {
            await handleGenerateHash(email, password);
            console.log(hash)
            const database = await Firebase.database();
            console.log(hash)
            const userRef = database.ref(`users/${hash}`);
            userRef.set({ email });
            await AsyncStorage.setItem('quizKey', hash);
            console.log("SignUp Successfull")
            navigation.navigate('LiveQuiz');
        }
        else {
            console.log("something went wrong")
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {loggedIn ? (
                <Text>Welcome back!</Text>
            ) : (
                <View style={styles.loginContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    <Button title="Login" onPress={handleLogin} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    welcomeText: {
        fontSize: 20,
        textAlign: 'center',
    },
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});
