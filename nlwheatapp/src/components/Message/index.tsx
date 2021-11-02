import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

//Setando a tipagem da message
export type MessageProps = {
    id: string;
    text: string;
    user: {
        name: string;
        avatar_url: string;
    }
}
//Apenas deixando tipagem mais pequena para o props do Component Message
type Props = {
    data: MessageProps;
}


export function Message({ data }: Props) {
    return (
        // Container da Menssagem (MotiView: permite fazer animacoes na view)
        <MotiView
            style={styles.container}
            //Efeitos de animacao
            from={{ opacity: 0, translateY: -50 }}//initial position da message
            animate={{ opacity: 1, translateY: 0 }}//efeito de animacao
            transition={{ type: 'timing', duration: 700 }}//detalhes da transicao
        >

            {/* Texto da menssagem */}
            <Text style={styles.message}>
                {data.text}
            </Text>

            {/* Dados do de quem enviou a mensagem (rodape da message)*/}
            <View style={styles.footer}>
                <UserPhoto
                    imageUri={data.user.avatar_url}
                    sizes="SMALL"
                />
                <Text style={styles.userName}>
                    {data.user.name}
                </Text>

            </View>
        </MotiView>
    );
}