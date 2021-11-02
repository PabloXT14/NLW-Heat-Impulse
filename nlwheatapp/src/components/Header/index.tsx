import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserPhoto } from '../UserPhoto';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';

import LogoSvg from '../../assets/logo.svg';


export function Header() {
    //buscando dados de autenticacao
    const { user, signOut } = useAuth();

    return (
        <View style={styles.container}>
            {/* Logo */}
            <LogoSvg />


            <View style={styles.logoutButton}>
                {/* Criando botão */}
                {/* verificando se user esta logado */}
                {
                    user &&
                    <TouchableOpacity onPress={signOut}>
                        <Text style={styles.logoutText}>
                            Sair
                        </Text>
                    </TouchableOpacity>
                }

                {/* Foto do Usuario */}
                <UserPhoto
                    imageUri={user?.avatar_url}
                />
            </View>





        </View>
    );
}