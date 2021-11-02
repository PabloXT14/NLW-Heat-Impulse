import React from "react";
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Header } from "../../components/Header";
import { MessageList } from "../../components/MessageList";
import { SignInBox } from '../../components/SignInBox';
import { SendMessageForm } from '../../components/SendMessageForm';
import { useAuth } from "../../hooks/auth";


import { styles } from './styles';


export function Home() {
    const { user } = useAuth()

    return (
        // Fazendo nosso teclado se adaptar da forma que queros tanto em IOS qnt Android
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                <Header />
                <MessageList />
                { /* Show SignInBox or SendMessageForm (check se user esta logado) */}
                {user ? <SendMessageForm /> : <SignInBox />}

            </View>
        </KeyboardAvoidingView>

    );
}

