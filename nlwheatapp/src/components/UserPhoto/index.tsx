import React from 'react';
import { Image } from 'react-native';
import avatarImg from '../../assets/avatar.png';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { COLORS } from '../../theme';


// Tamanhos padroes para imagem do avatar 
const SIZES = {
    SMALL: {
        containerSize: 32,
        avatarSize: 28,
    },
    NORMAL: {
        containerSize: 48,
        avatarSize: 42,
    }
}

//Setando quais os tipos do Props do UserPhoto
type Props = {
    imageUri: string | undefined;
    sizes?: 'SMALL' | 'NORMAL';
}


//Imagem de perfil padrão caso o usuario nao esteja logado
const AVATAR_DEFAULT = Image.resolveAssetSource(avatarImg).uri;

export function UserPhoto({ imageUri, sizes = 'NORMAL' }: Props) {
    //desestruturando sizes
    const { containerSize, avatarSize } = SIZES[sizes];

    return (

        //Componente do gradiente envolta imagem
        <LinearGradient
            colors={[COLORS.PINK, COLORS.YELLOW]}
            start={{ x: 0, y: 0.8 }}//inicio da rotacao
            end={{ x: 0.9, y: 1 }}//termino da rotacao
            style={[
                styles.container,
                {
                    width: containerSize,
                    height: containerSize,
                    borderRadius: containerSize / 2
                }
            ]}
        >
            <Image
                source={{ uri: imageUri || AVATAR_DEFAULT }}
                style={[
                    styles.avatar,
                    {
                        width: avatarSize,
                        height: avatarSize,
                        borderRadius: avatarSize / 2,
                    }
                ]}
            />
        </LinearGradient>

    );
}